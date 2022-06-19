import { Button, Form, Input, Modal, Space, Table, Tabs, Tag } from "antd"
import { ColumnsType } from "antd/lib/table"
import { MenuOutlined } from "@ant-design/icons"
import axios from "axios"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { getCampaignData, updateCampaign } from "./services"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useForm } from "antd/lib/form/Form"

const { Column, ColumnGroup } = Table

interface DataType {
   key: React.Key
   firstName: string
   lastName: string
   age: number
   address: string
   tags: string[]
}

const type = "dragable"

const Campaign: React.FC = () => {
   const { TabPane } = Tabs
   const [form] = useForm()

   const column = [
      {
         title: "",
         dataIndex: "id",
         width: 30,
         className: "drag-visible",
         render: () => <MenuOutlined style={{ cursor: "grab", color: "#999" }} />,
      },
      {
         title: "ID",
         dataIndex: "id",
         sorter: true,
      },
      {
         title: "Title",
         dataIndex: "title",
         sorter: true,
      },
      {
         title: "Phone",
         dataIndex: "phone",
         sorter: true,
      },
      {
         title: "Email",
         dataIndex: "email",
         sorter: true,
      },
      {
         key: "view",
         render: (_: any, record: ICampaign) => {
            return <a onClick={() => viewDetailCampaign(record.id)}>Add</a>
            // <Textlink
            //    // text={t("VIEW_TEXT")}
            //    text="Add"
            //    // onClick={() => {
            //    //    onChangeTab({ key: "1", type: "Add", campaignId: record.id })
            //    //    onViewCampaignDetail(record.id)
            //    // }}
            // />
         },
      },
   ]

   const [dataSource, setDataSource] = useState<any>([])
   const [visible, setVisible] = useState(false)
   const [tabData, setTabData] = useState<ICampaign>()

   const viewDetailCampaign = (campaignId: string) => {
      setVisible(true)
      let campaign = dataSource.filter((item: ICampaign) => item.id === campaignId)
      if (campaign) setTabData(campaign)
   }

   useEffect(() => {
      const getData = async () => {
         let res = await getCampaignData()
         console.log("res", res)
         let result = res?.data?.map((item: ICampaign) => {
            return {
               id: item.id,
               title: item.title,
               phone: item.contactPhone,
               email: item.contactEmail,
               logo: item.logo,
               position: item.position,
            }
         })
         setDataSource(result)
      }
      getData()
   }, [])

   const DragableBodyRow = ({ index, className, style, ...restProps }: any) => {
      const ref = useRef<HTMLTableRowElement | null>(null)
      const [{ isOver, dropClassName }, drop] = useDrop({
         accept: type,
         collect: (monitor: any) => {
            const { index: dragIndex } = monitor.getItem() || {}
            if (dragIndex === index) {
               return {}
            }
            return {
               isOver: monitor.isOver(),
               dropClassName: dragIndex < index ? " drop-over-downward" : " drop-over-upward",
            }
         },
         drop: (item: any) => {
            dragRow(item.index, index)
         },
      })
      const [, drag] = useDrag({
         type,
         item: { index },
         collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
         }),
      })
      drop(drag(ref))

      return (
         <tr
            ref={ref}
            className={`${className}${isOver ? dropClassName : ""}`}
            style={{ cursor: "move", ...style }}
            {...restProps}
         />
      )
   }

   const dragRow = async (dragIndex: number, hoverIndex: number) => {
      let tempData = [...dataSource]

      let tempItem = tempData.splice(dragIndex, 1)
      tempData.splice(hoverIndex, 0, ...tempItem)
      setDataSource(tempData)

      try {
         let dragID = dataSource[dragIndex].id
         let hoverID = dataSource[hoverIndex].id
         await updateCampaign({ id: dragID, position: hoverIndex })
         await updateCampaign({ id: hoverID, position: dragIndex })
      } catch (error) {
         console.log("error", error)
      }
   }

   return (
      <>
         <DndProvider backend={HTML5Backend}>
            <Table
               dataSource={dataSource}
               columns={column}
               onRow={(_, index) =>
                  ({
                     index,
                  } as any)
               }
               components={{
                  body: {
                     row: DragableBodyRow,
                  },
               }}
            />
         </DndProvider>

         <Modal
            title='Basic Modal'
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
         >
            <Tabs
               defaultActiveKey='1'
               //  onChange={onChange}
            >
               <TabPane tab='Tab 1' key='1'>
                  Info
                  {tabData?.title}
                  <Tag color='magenta'>magenta</Tag>
               </TabPane>
               <TabPane tab='cashback' key='2'>
                  Cash back
                  <Form
                     form={form}
                     name='basic'
                     labelCol={{ span: 8 }}
                     wrapperCol={{ span: 16 }}
                     initialValues={{ remember: true }}
                  >
                     <Form.Item
                        label='Event'
                        name='event'
                        rules={[{ required: true, message: "Please input your username!" }]}
                     >
                        <Input />
                     </Form.Item>

                     <Form.Item
                        label='Discount'
                        name='discount'
                        rules={[{ required: true, message: "Please input your password!" }]}
                     >
                        <Input.Password />
                     </Form.Item>

                     <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                           type='primary'
                           htmlType='submit'
                           //  onClick={login}
                        >
                           Submit
                        </Button>
                     </Form.Item>
                  </Form>
               </TabPane>
            </Tabs>
         </Modal>
      </>
   )
}

export default Campaign

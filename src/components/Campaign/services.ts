import axios, { AxiosRequestHeaders } from "axios"
import axiosClient from "../../utils/axiosClient"

const getCampaignData = async () => {
   try {
      let res = await axiosClient.get("https://trustpay-dev-cms-api.demoapp.info/cms/campaign")
      return res.data
   } catch (error) {
      console.log("error", error)
   }
}

const updateCampaign = async ({
   id,
   ...payload
}: IUpdateCampaignRequest): Promise<IUpdateCampaignResponse> => {
   try {
      let res = await axiosClient.patch(
         `https://trustpay-dev-cms-api.demoapp.info/cms/campaign/${id}`,
         payload
      )
      return res?.data
   } catch (error) {
      console.log("error", error)
      throw error
   }
}

export { getCampaignData, updateCampaign }

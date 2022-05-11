import Api from './index'

class getData {
    getPregectures(){
        return Api().get("api/v1/prefectures")
    }
    getPopulation(id){
        return Api().get("api/v1/population/composition/perYear",{
            params: {
                prefCode: id,
                cityCode: "-"
            }
        })
    }
}

export default new getData()
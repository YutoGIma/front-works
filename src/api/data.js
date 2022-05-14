import Api from "./index";

class getData {
  /** 都道府県のリストを取得
   *  @returns /result/prefCode 	都道府県コード
   *  @returns /result/prefName 	都道府県名
   */
  getPregectures() {
    return Api().get("api/v1/prefectures");
  }
  /**
   * 
   * @param  id prefCode
   * @param  prefCode 都道府県コード
   * @param  cityCode 市区町村コード("-")
   * @returns /result/boundaryYear 実績値と推計値の区切り年
   * @returns /result/data/label ラベル
   * @returns /result/data/data/year 年
   * @returns /result/data/data/value
   * @returns 人口
   */
  getPopulation(id) {
    return Api().get("api/v1/population/composition/perYear", {
      params: {
        prefCode: id,
        cityCode: "-",
      },
    });
  }
}

export default new getData();

export interface ArticleModel {
  id: string,
  title: string,
  createtime: number,
  cover?: string,
  phone?: string,
  detail: string,
  state?: string | number
}

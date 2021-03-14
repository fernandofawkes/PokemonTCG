import { Card } from "./Card";

interface ApiResponse {
  data: Card[],
  page: number,
  count: number,
  pageSize: number,
  totalCount: number
}

export {ApiResponse};
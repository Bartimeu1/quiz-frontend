export interface TestType {
  id: number;
  title: string;
  description?: string;
}

export interface GetAllTestsResponse {
  tests: TestType[];
}

export interface CreateTestRequest {
  title: string;
  description?: string;
}

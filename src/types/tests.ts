export interface TestType {
  id: number;
  title: string;
  description?: string;
}

export interface GetAllTestsResponse {
  tests: TestType[];
}

export interface GetTestDetailsRequest {
  id: number;
}

export interface GetTestDetailsResponse {
  test: TestType;
}

export interface DeleteTestRequest {
  id: number;
}

export interface CreateTestRequest {
  title: string;
  description?: string;
}

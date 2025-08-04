export interface TestType {
  id: string;
  title: string;
  description?: string;
}

export interface GetAllTestsResponse {
  tests: TestType[];
}

export interface GetTestDetailsRequest {
  id: string;
}

export interface GetTestDetailsResponse {
  test: TestType;
}

export interface DeleteTestRequest {
  id: string;
}

export interface CreateTestRequest {
  title: string;
  description?: string;
}

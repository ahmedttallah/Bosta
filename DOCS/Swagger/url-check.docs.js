const createURLCheck = {
  tags: ["URL Check"],
  summary: "Create a new URL Check",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            url: {
              type: "string",
              example: "https://example.com",
            },
            name: {
              type: "string",
            },
            protocol: {
              type: "string",
            },
            timeout: {
              type: "number",
              example: 5000,
            },
            interval: {
              type: "number",
              example: 60000,
            },
            tags: {
              type: "array",
              items: {
                type: "string",
                example: "website",
              },
            },
          },
          required: ["url", "timeout", "interval"],
        },
      },
    },
  },
  responses: {
    201: {
      description: "URL Check created successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true,
              },
              message: {
                type: "string",
                example: "URL Check created successfully",
              },
              data: {
                type: "object",
                properties: {
                  id: {
                    type: "number",
                    example: 1,
                  },
                  url: {
                    type: "string",
                    example: "https://example.com",
                  },
                  timeout: {
                    type: "number",
                    example: 5000,
                  },
                  interval: {
                    type: "number",
                    example: 60000,
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                      example: "website",
                    },
                  },
                  createdAt: {
                    type: "string",
                    example: "2023-05-20T12:00:00.000Z",
                  },
                  updatedAt: {
                    type: "string",
                    example: "2023-05-20T12:00:00.000Z",
                  },
                },
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Validation error: Please provide a valid URL.",
              },
              errors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    field: {
                      type: "string",
                      example: "url",
                    },
                    message: {
                      type: "string",
                      example: "URL is required.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Internal server error",
              },
            },
          },
        },
      },
    },
  },
};

const updateURLCheck = {
  tags: ["URL Check"],
  summary: "Update a specific URL Check by ID",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "number",
      },
      example: 1,
    },
  ],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            status: {
              type: "boolean",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "URL Check updated successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true,
              },
              message: {
                type: "string",
                example: "URL Check updated successfully",
              },
              data: {
                type: "object",
                properties: {
                  id: {
                    type: "number",
                    example: 1,
                  },
                  url: {
                    type: "string",
                    example: "https://example.com",
                  },
                  timeout: {
                    type: "number",
                    example: 5000,
                  },
                  interval: {
                    type: "number",
                    example: 60000,
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                      example: "website",
                    },
                  },
                  createdAt: {
                    type: "string",
                    example: "2023-05-20T12:00:00.000Z",
                  },
                  updatedAt: {
                    type: "string",
                    example: "2023-05-20T12:10:00.000Z",
                  },
                },
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Validation error: Please provide a valid URL.",
              },
              errors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    field: {
                      type: "string",
                      example: "url",
                    },
                    message: {
                      type: "string",
                      example: "URL is required.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    404: {
      description: "URL Check not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "URL Check not found",
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Internal server error",
              },
            },
          },
        },
      },
    },
  },
};

const deleteURLCheck = {
  tags: ["URL Check"],
  summary: "Delete a specific URL Check by ID",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "number",
        example: 1,
      },
    },
  ],
  responses: {
    200: {
      description: "URL Check deleted successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true,
              },
              message: {
                type: "string",
                example: "URL Check deleted successfully",
              },
            },
          },
        },
      },
    },
    404: {
      description: "URL Check not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "URL Check not found",
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Internal server error",
              },
            },
          },
        },
      },
    },
  },
};

const getAllURLChecks = {
  tags: ["URL Check"],
  summary: "Get all URL Checks",
  responses: {
    200: {
      description: "URL Checks retrieved successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true,
              },
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "number",
                      example: 1,
                    },
                    url: {
                      type: "string",
                      example: "https://example.com",
                    },
                    timeout: {
                      type: "number",
                      example: 5000,
                    },
                    interval: {
                      type: "number",
                      example: 60000,
                    },
                    tags: {
                      type: "array",
                      items: {
                        type: "string",
                        example: "website",
                      },
                    },
                    createdAt: {
                      type: "string",
                      example: "2023-05-20T12:00:00.000Z",
                    },
                    updatedAt: {
                      type: "string",
                      example: "2023-05-20T12:00:00.000Z",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Internal server error",
              },
            },
          },
        },
      },
    },
  },
};

const getURLCheckById = {
  tags: ["URL Check"],
  summary: "Get a specific URL Check by ID",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "number",
        example: 1,
      },
    },
  ],
  responses: {
    200: {
      description: "URL Check retrieved successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true,
              },
              data: {
                type: "object",
                properties: {
                  id: {
                    type: "number",
                    example: 1,
                  },
                  url: {
                    type: "string",
                    example: "https://example.com",
                  },
                  timeout: {
                    type: "number",
                    example: 5000,
                  },
                  interval: {
                    type: "number",
                    example: 60000,
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                      example: "website",
                    },
                  },
                  createdAt: {
                    type: "string",
                    example: "2023-05-20T12:00:00.000Z",
                  },
                  updatedAt: {
                    type: "string",
                    example: "2023-05-20T12:00:00.000Z",
                  },
                },
              },
            },
          },
        },
      },
    },
    404: {
      description: "URL Check not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "URL Check not found",
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Internal server error",
              },
            },
          },
        },
      },
    },
  },
};

const generateUptimeReport = {
  tags: ["URL Check"],
  summary: "Generate uptime report for a URL Check",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "number",
        example: 1,
      },
    },
  ],
  responses: {
    200: {
      description: "Uptime report generated successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true,
              },
              message: {
                type: "string",
                example: "Uptime report generated successfully",
              },
              data: {
                type: "object",
                properties: {
                  id: {
                    type: "number",
                    example: 1,
                  },
                  url: {
                    type: "string",
                    example: "https://example.com",
                  },
                  startDate: {
                    type: "string",
                    example: "2023-05-19T12:00:00.000Z",
                  },
                  endDate: {
                    type: "string",
                    example: "2023-05-20T12:00:00.000Z",
                  },
                  uptime: {
                    type: "number",
                    example: 99.5,
                  },
                  report: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        timestamp: {
                          type: "string",
                          example: "2023-05-20T00:00:00.000Z",
                        },
                        status: {
                          type: "string",
                          example: "up",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    404: {
      description: "URL Check not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "URL Check not found",
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Internal server error",
              },
            },
          },
        },
      },
    },
  },
};

const getReportsByTag = {
  tags: ["URL Check"],
  summary: "Get reports by tag",
  parameters: [
    {
      name: "tagId",
      in: "path",
      description: "ID of the tag",
      required: true,
      schema: {
        type: "integer",
      },
    },
  ],
  responses: {
    200: {
      description: "Reports retrieved successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true,
              },
              data: {
                type: "object",
                properties: {
                  tag: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                        example: 1,
                      },
                      name: {
                        type: "string",
                        example: "Tag Name",
                      },
                    },
                  },
                  reports: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                          example: 1,
                        },
                        // Include other properties of the report as needed
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    404: {
      description: "Tag not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Tag not found",
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Internal server error",
              },
            },
          },
        },
      },
    },
  },
};

const urlCheckRoutesDocs = {
  "/url-check/": {
    post: createURLCheck,
  },
  "/url-check": {
    get: getAllURLChecks,
  },
  "/url-check/{id}": {
    get: getURLCheckById,
  },
  "//url-check/{id}": {
    put: updateURLCheck,
  },
  "/url-check//{id}": {
    delete: deleteURLCheck,
  },
  "/url-check/{id}/reports": {
    get: generateUptimeReport,
  },
  "/url-check/tags/{tagId}/reports": {
    get: getReportsByTag,
  },
};

module.exports = urlCheckRoutesDocs;

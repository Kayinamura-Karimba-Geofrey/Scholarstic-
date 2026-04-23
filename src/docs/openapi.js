export const openAPISpec = {
  openapi: '3.0.0',

  info: {
    title: 'School Management API',
    version: '1.0.0',
    description: 'Professional API for managing users, courses, enrollments, and grades'
  },

  servers: [
    {
      url: 'http://localhost:3000'
    }
  ],

  tags: [
    { name: 'Auth', description: 'Authentication endpoints' },
    { name: 'Courses', description: 'Course management' },
    { name: 'Enrollments', description: 'Student enrollment management' },
    { name: 'Grades', description: 'Grade and assessment management' }
  ],

  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },

    // 🔥 REUSABLE SCHEMAS
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'John' },
          role: {
            type: 'string',
            enum: ['STUDENT', 'TEACHER', 'ADMIN'],
            example: 'STUDENT'
          }
        }
      },

      Course: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          title: { type: 'string', example: 'Mathematics' },
          teacherId: { type: 'number', example: 2 }
        }
      },

      Enrollment: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          userId: { type: 'number', example: 1 },
          courseId: { type: 'number', example: 1 }
        }
      },

      Grade: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          enrollmentId: { type: 'number', example: 1 },
          score: { type: 'number', example: 95.5 }
        }
      },

      AuthRequest: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'john' },
          password: { type: 'string', example: '1234' }
        },
        required: ['name', 'password']
      },

      RegisterRequest: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'john' },
          password: { type: 'string', example: '1234' },
          role: {
            type: 'string',
            enum: ['STUDENT', 'TEACHER', 'ADMIN'],
            example: 'STUDENT'
          }
        },
        required: ['name', 'password']
      },

      AuthResponse: {
        type: 'object',
        properties: {
          user: { $ref: '#/components/schemas/User' },
          token: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...'
          }
        }
      },

      ErrorResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Invalid credentials'
          }
        }
      }
    }
  },

  security: [{ BearerAuth: [] }],

  paths: {
    // 🔐 AUTH
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register new user',

        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RegisterRequest'
              }
            }
          }
        },

        responses: {
          201: {
            description: 'User created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' }
              }
            }
          },
          400: {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },

    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login user',

        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthRequest'
              }
            }
          }
        },

        responses: {
          200: {
            description: 'JWT token returned',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthResponse' }
              }
            }
          },
          401: {
            description: 'Invalid credentials',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },

    // 📚 COURSES
    '/courses': {
      get: {
        tags: ['Courses'],
        summary: 'Get all courses',
        security: [{ BearerAuth: [] }],

        responses: {
          200: {
            description: 'List of courses',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Course'
                  }
                }
              }
            }
          }
        }
      },

      post: {
        tags: ['Courses'],
        summary: 'Create course (ADMIN only)',
        security: [{ BearerAuth: [] }],

        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string', example: 'Physics' },
                  teacherId: { type: 'number', example: 2 }
                },
                required: ['title', 'teacherId']
              }
            }
          }
        },

        responses: {
          201: {
            description: 'Course created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Course'
                }
              }
            }
          },
          403: {
            description: 'Forbidden',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },

    // 📝 ENROLLMENTS
    '/enrollments': {
      post: {
        tags: ['Enrollments'],
        summary: 'Enroll in a course (STUDENT only)',
        security: [{ BearerAuth: [] }],

        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  courseId: { type: 'number', example: 1 }
                },
                required: ['courseId']
              }
            }
          }
        },

        responses: {
          201: {
            description: 'Enrolled successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Enrollment' }
              }
            }
          },
          403: {
            description: 'Forbidden'
          }
        }
      }
    },

    // 🏆 GRADES
    '/grades': {
      post: {
        tags: ['Grades'],
        summary: 'Assign a grade (TEACHER only)',
        security: [{ BearerAuth: [] }],

        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  enrollmentId: { type: 'number', example: 1 },
                  score: { type: 'number', example: 85 }
                },
                required: ['enrollmentId', 'score']
              }
            }
          }
        },

        responses: {
          201: {
            description: 'Grade assigned',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Grade' }
              }
            }
          },
          403: {
            description: 'Forbidden'
          }
        }
      }
    }
  }
}
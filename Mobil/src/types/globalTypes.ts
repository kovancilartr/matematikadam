export type RootStackParamList = {
  Search: undefined;
  SplashScreen: undefined;
  CourseDetailScreen: { course: Course };
  RegisterScreen: undefined;
  Profile: undefined;
  LoginScreen: undefined;
  Courses: undefined;
  Home: undefined;
  SubCategoryScreen: { categoryName: string; categoryId: string };
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type User = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  role: {
    id: number;
    documentId: string;
    name: string;
    publishedAt: string;
    type: string;
    updateAt: string;
  };
};

export type Category = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  courses: Course[];
};

export type Section = {
  id: number;
  documentId: string;
  title: string;
  position: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  chapters: Chapter[];
};

export type Chapter = {
  id: number;
  documentId: string;
  title: string;
  position: number;
  isFree: boolean;
  publishedAt: string;
  sections: Section[];
  createdAt: string;
  updatedAt: string;
};

export type UserProgress = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  isCompleted: boolean;
};

export type Purchase = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Course = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  price: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  categories: Category[];
  sections: Section[];
  user_progresses: UserProgress[];
  purchases: Purchase[];
};


// Bunu nerde kullandım bilmiyorum ?
export type CoursesResponse = {
  data: Course[];
  meta: {
    pagination: PaginationMeta;
  };
};

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
  name: string;
  surname: string;
  image: {
    id: number;
    documentId: string;
    url: string;
    width: number;
    height: number;
    hash: string;
    ext: string;
    mime: string;
    provider: string;
    size: number;
    format: {
      large: {
        url: string;
        width: number;
        height: number;
        size: number;
        hash: string;
        ext: string;
        mime: string;
        sizeInBytes: string;
      };
      medium: {
        url: string;
        width: number;
        height: number;
        size: number;
        hash: string;
        ext: string;
        mime: string;
        sizeInBytes: string;
      };
      small: {
        url: string;
        width: number;
        height: number;
        size: number;
        hash: string;
        ext: string;
        mime: string;
        sizeInBytes: string;
      };
      thumbnail: {
        url: string;
        width: number;
        height: number;
        size: number;
        hash: string;
        ext: string;
        mime: string;
        sizeInBytes: string;
      };
    };
  };
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
  description: string;
  position: number;
  isFree: boolean;
  publishedAt: string;
  videoUrl: string;
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

export type NavRoute = {
  route: string;
  name: string;
  icon: string;
};

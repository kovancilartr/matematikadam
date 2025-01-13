import { Category, Course } from "@/types/globalTypes";

export const getCourses = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses?populate[categories][populate]=*&populate[sections][populate][chapters][populate]=*`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // console.log("Server Response: getCourses", data.data);
    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("There was a problem with the getCourses function:", error);
  }
};

export const getCourse = async (
  courseId: string
): Promise<{ success: boolean; data: Course } | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}?populate[categories][populate]=*&populate[sections][populate][chapters][populate]=*&populate[purchases][populate]=*`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("There was a problem with the getCourse function:", error);
    return null; // Undefined yerine null döndürülüyor.
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories?populate=*`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // console.log("Server Response: getCategories", data.data);
    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error(
      "There was a problem with the getCategories function:",
      error
    );
  }
};

export const getFilteredCategoriesCourses = async (
  categoryId?: string,
  courseName?: string
) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    console.error("API URL is not defined in environment variables.");
    return;
  }

  try {
    let url = categoryId
      ? `${baseUrl}/categories?populate[courses][populate]=*&filters[documentId][$eqi]=${categoryId}&filters[courses][isPublished][$eq]=true`
      : `${baseUrl}/categories?populate[courses][populate]=*&filters[courses][isPublished][$eq]=true`;

    // courseName varsa URL'ye filtre ekle
    if (courseName) {
      url += `&filters[courses][title][$containsi]=${courseName}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();

    // Extract courses from the response
    const courses = data.data
      ?.flatMap((category: Category) => category.courses || [])
      ?.filter((course: Course) => course.isPublished === true)
      ?.filter((course: Course) =>
        courseName
          ? course.title.toLowerCase().includes(courseName.toLowerCase())
          : true
      ) // courseName varsa ek filtreleme yap
      ?.reduce((uniqueCourses: Course[], course: Course) => {
        if (!uniqueCourses.some((c) => c.documentId === course.documentId)) {
          uniqueCourses.push(course);
        }
        return uniqueCourses;
      }, []);

    return {
      success: true,
      data: courses || [],
    };
  } catch (error) {
    console.error(
      "There was a problem with the getFilteredCategoriesCourses function:",
      error
    );
    return {
      success: false,
      error,
    };
  }
};

export const getUserAndCoursesPurchases = async (
  userId: string,
  courseId: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users?populate[purchases][populate]=*&filters[purchases][user_id][documentId][$eq]=${userId}&filters[purchases][course][documentId][$eq]=${courseId}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Server Response: getUserAndCoursesPurchases", data);
    if (data.length > 0) {
      return {
        success: true,
        data: data.data,
      };
    } else if (data.length === 0) {
      return {
        success: false,
        data: null,
      };
    }
  } catch (error) {
    console.error(
      "There was a problem with the getUserAndCoursesPurchases function:",
      error
    );
  }
};

export const getChapter = async (chapterId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chapters/${chapterId}?populate=*`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("There was a problem with the getChapter function:", error);
  }
};

export const getNavRoutes = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/nav-routes?sort=id:desc`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Server Response: getNavRoutes", data);
    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.log(error);
  }
};

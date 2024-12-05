interface ICategories {
    status: string;
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: {
      categories: [
        {
          _id: string;
          name: string;
          icon: string;
          createdAt: string;
          updatedAt: string;
          slugname: string;
        }
      ];
    };
  }
  
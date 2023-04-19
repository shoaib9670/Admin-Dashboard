export class StoreModel {
  address: string = '';
  // brand?: string[] = [];
  categoryId: string = '';
  categoryName: string = '';
  city: string = '';
  description: string = '';
  discount: number = 0;
  exclusive?: boolean = false;
  featured?: boolean = false;
  homeDelivery?: boolean = false;
  images?: image[];
  isCoinVendor?: string = '';
  locality: string = '';
  location?: object[] = [{
    id: -1,
    latitude: '',
    longitude: ''
  }];
  offer?: object[] = [{
    createdAt: new Date(),
    id: 0,
    image: '',
    offerdiscount: ''
  }];
  onlineShop?: boolean = false;
  openinghours: object[] = [{
    montofri: '',
    sattosun: ''
  }];
  Package?: string = '';
  packagePriority?: number = -1;
  phoneNo: string = '';
  products?: object[] = [
    {
      productName: "",
      url: "",
    },
  ];
  seasonBanner?: string = '';
  storeName: string = '';
  subCategoryName: string = '';
  tags?: string = "";
  uniqueId: string = '';
  userId: string = '';
  vendor: object = {
    vendor_name: ''
  };
}

export class Review {
  storeId: string = '';
  email?: string = '';
  url?: string = '';
  userName: string = '';
  rating: number = 0;
  comment: string = '';
  createdAt?: Date = new Date();
}

// export class location {
//   id: number = -1;
//   latitude: string = ''
//   longitude: string = ''

// }

// export class offer {
//   createdAt: Date = new Date();
//   id: number = 0;
//   image: string = '';
//   offerdiscount: string = ''
// }

export class image {

  id: number = 0;
  url: string = "";
  public_id: string = ""

} 

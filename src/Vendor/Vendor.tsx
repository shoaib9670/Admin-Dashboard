import React, { useEffect, useState } from "react";
import './Vendor.css';
import { useNavigate } from "react-router-dom";
import { UploadVendor, getLocality, handleImageUpload } from "../Services/vendorDashServices";
import { StoreModel } from "../Model/StoreModel";
import { getCategories, getSubCat, setCateId } from "../Services/GetCategoryServices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyForm = () => {

    const [allLocality, setAllLocality] = useState<any>([])
    const [allSubCat, setAllSubCat] = useState<any>([])
    const [allCategories, setAllCategories] = useState([])
    const [categoryName, setCategoryName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [city, setCity] = useState("");
    const [discount, setDiscount] = useState<number>(0)
    const [featured, setFeatured] = useState<boolean>(false);
    const [isCoinV, setIsCoinV] = useState<string>("")
    const [images, setImages] = useState([
        {
            id: 0,
            url: "",
            public_id: "Store Image",
        },
        {
            id: 1,
            url: "",
            public_id: "Vendor Image",
        }
    ]);
    const [locality, setLocality] = useState("");
    const [location, setLocation] = useState([{
        id: 0,
        latitude: '',
        longitude: ''
    }])
    const [onlineShop, setOnlineShop] = useState<boolean>(false);
    const [exclusive, setExclusive] = useState<boolean>(false);
    const [openinghours, setOpeningHours] = useState<any[]>([
        {
            montofri: "",
        },
        {
            sattosun: ""
        }
    ]);
    const [products, setProducts] = useState([
        {
            productName: "",
            url: "",
        },
    ]);
    const [subCategoryName, setSubCategoryName] = useState("");
    const [tags, setTags] = useState<string>("");
    const [vendor, setVendor] = useState(
        {
            vendor_name: "",
        },
    );
    const [storeName, setStoreName] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [Package, setPackage] = useState("");
    const [seasonBanner, setSeasonBanner] = useState("");
    const [packagePriority, setpackagePriority] = useState<number>(0);
    const [phoneNo, setPhoneNo] = useState<string>('');
    const [homeDelivery, setHomeDelivery] = useState<boolean>(false);
    const [offer, setOffers] = useState([
        {
            createdAt: new Date,
            id: 0,
            image: "",
            offersdiscount: "",
        }
    ]);
    const [userId, setUserId] = useState<string>('')
    const [uniqueId, setUniqueId] = useState<string>('')
    const navigate = useNavigate();

    const vendorData: StoreModel = {
        categoryName: categoryName,
        categoryId: categoryId,
        subCategoryName: subCategoryName,
        city: city,
        discount: discount,
        featured: featured,
        isCoinVendor: isCoinV,
        images: images,
        locality: locality,
        location: location,
        onlineShop: onlineShop,
        exclusive: exclusive,
        openinghours: openinghours,
        products: products,
        tags: tags,
        vendor: vendor,
        storeName: storeName,
        address: address,
        description: description,
        Package: Package,
        seasonBanner: seasonBanner,
        packagePriority: packagePriority,
        phoneNo: phoneNo,
        homeDelivery: homeDelivery,
        offer: offer,
        userId: userId,
        uniqueId: uniqueId
    }


    type ImageKey = 'url' | 'public_id';
    type ProductKey = 'url' | 'productName';

    const cities = ["Noida", "Greater Noida", "Ghaziabad"];

    const handleSubmit = (e: any) => {
        e.preventDefault();
        UploadVendor(vendorData)
        console.log(vendorData);
        notify()
        setTimeout(() => {
            window.location.reload()
        }, 3000)

        // handle form submission here
    };


    const addProduct = (e: any) => {
        e.preventDefault();
        setProducts([...products, { productName: '', url: '' }]);
    };


    const removeProduct = (index: number) => {
        const newProducts = [...products];
        newProducts.splice(index, 1);
        setProducts(newProducts);
    };


    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        console.log(e.target.files);

        const newImages = e.target.files?.[0];
        handleImageUpload(newImages).then((res) => {
            console.log(res);
            setProducts([
                {
                    ...products[0],
                    url: res,
                },
            ])
        })
    }

    //setOffers([{ ...offer[0], image: e.target.value }])

    const handleOfferImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        console.log(e.target.files);
        const newImages = e.target.files?.[0];
        handleImageUpload(newImages).then((res) => {
            console.log(res);
            setOffers([
                {
                    ...offer[0],
                    image: res,
                },
            ])
        })


    };




    const handleVImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        console.log(e.target.files);
        const newImages = e.target.files?.[0];
        handleImageUpload(newImages).then((res) => {
            console.log(res);
            setImages([
                {
                    ...images[0],
                    url: res,
                },
            ])
        })


    };

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        console.log(e.target.files);
        const newImages = e.target.files?.[0];
        handleImageUpload(newImages).then((res) => {
            console.log(res);
            setImages([
                {
                    ...images[1],
                    url: res,
                },
            ])
        })


    };


    const Priority = [1, 2, 3, 4, 5, 6]

    useEffect(() => {
        getLocality(city).then((res) => {
            setAllLocality(res)
        })
    }, [city])

    useEffect(() => {
        getCategories().then((res) => {
            setAllCategories(res)

        })
    }, [])

    useEffect(() => {
        getSubCat(categoryName).then((res: any) => {
            setAllSubCat(res)
        })
            .catch((e) => console.log(e))
    }, [categoryName])

    useEffect(() => {
        setCateId(categoryName).then((res: any) => {
            setCategoryId(res)
        })
    }, [categoryName])

    const notify = () => toast("Wow so easy!");

    return (
        <form >
            <label htmlFor="city">
                CategoryName:
            </label>
            <select id="categoryName" name="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}>
                <option value="">Select Category </option>
                {allCategories.map((c) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>
            <label htmlFor="city">
                Sub CategoryName:
            </label>
            <select id="subcategoryName" name="subcategoryName" value={subCategoryName} onChange={(e) => setSubCategoryName(e.target.value)}>
                <option value="">Select Sub Category</option>
                {allSubCat?.map((c: any, index: number) => (
                    <option key={index} value={c}>
                        {c}
                    </option>
                ))}
            </select>
            <label htmlFor="city">City</label>
            <select id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">Select City</option>
                {cities.map((c) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>
            <label>
                Locality:
            </label>
            <select id="locality" name="locality" value={locality} onChange={(e) => setLocality(e.target.value)}>
                <option value="">Select Locality</option>
                {allLocality.map((c: any) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>
            <div>
                <h2>Vendor Images</h2>
                <label style={{ marginLeft: -100 }}>
                    <input
                        type="file"
                        placeholder="Image URL"
                        onChange={handleVImageChange}
                    />
                </label>
            </div>
            <div>
                <h2>Store Images</h2>
                <label style={{ marginLeft: -100 }}>
                    <input
                        type="file"
                        placeholder="Image URL"
                        onChange={handleImageChange}
                    />
                </label>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                <label style={{ marginLeft: -100 }}>
                    Latitude
                    <input
                        type="text"
                        value={location[0].latitude}
                        onChange={(e) =>
                            setLocation([
                                {
                                    ...location[0],
                                    latitude: e.target.value,
                                }

                            ])
                        }
                    />
                </label>
                <label style={{ marginLeft: 100 }}>
                    Longitude
                    <input
                        type="text"
                        value={location[0].longitude}
                        onChange={(e) =>
                            setLocation([
                                {
                                    ...location[0],
                                    longitude: e.target.value,
                                }

                            ])
                        }
                    />
                </label>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                <label style={{ marginLeft: -100 }}>
                    Opening Hours Mon-Fri:
                    <input
                        type="text"
                        value={openinghours[0].montofri}
                        onChange={(e) =>
                            setOpeningHours([
                                {
                                    montofri: e.target.value,
                                },
                                {
                                    ...openinghours[1]
                                }
                            ])
                        }
                    />
                </label>
                <label style={{ marginLeft: 100 }}>
                    Opening Hours Sat-Sun:
                    <input
                        type="text"
                        value={openinghours[1].sattosun}
                        onChange={(e) =>
                            setOpeningHours([
                                {
                                    ...openinghours[0]
                                },
                                {
                                    sattosun: e.target.value,
                                }
                            ])
                        }
                    />
                </label>
            </div>
            <div>
                <h2>Products</h2>
                {products.map((product, index) => (
                    <div key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ marginLeft: -100 }}>
                            <input

                                value={product.productName}
                                placeholder="Product Name"
                                onChange={(e) =>
                                    setProducts([
                                        {
                                            ...products[0],
                                            productName: e.target.value,
                                        },
                                    ])
                                }
                            />
                        </label>
                        <label style={{ marginLeft: 100 }}>
                            <input
                                type="file"
                                placeholder="URL"
                                onChange={handleInputChange}
                            />
                        </label>
                        {/* {index < 1 ?
                            null :
                            <button onClick={() => removeProduct(index)}>Remove</button>
                        } */}
                    </div>
                ))}
            </div>
            <button onClick={addProduct}>Add Product</button>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                <label style={{ marginLeft: -100 }}>
                    Discount:
                    <input
                        type="number"
                        // value={discount}
                        onChange={(e) => setDiscount(Number(e.target.value))}
                    />
                </label>

                <label style={{ marginLeft: 100 }}>
                    Tags Name:
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) =>
                            setTags(e.target.value)
                        }
                    />
                </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                <label style={{ marginLeft: -100 }}>
                    Vendor Name:
                    <input
                        type="text"
                        value={vendor.vendor_name}
                        onChange={(e) =>
                            setVendor({ ...vendor, vendor_name: e.target.value })
                        }
                    />
                </label>
                {/* <label style={{ marginLeft: 100 }}>
                    User Id:
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) =>
                            setUserId(e.target.value)
                        }
                    />
                </label> */}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                <label style={{ marginLeft: -100 }}>
                    Store Name:
                    <input
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                    />
                </label>
                <label style={{ marginLeft: 100 }}>
                    Address:
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                <div style={{ marginLeft: -100 }}>
                    <label>IsCoinVendor:</label>
                    <select id="city" name="IsCoinVendor" value={isCoinV} onChange={(e) => setIsCoinV(e.target.value)}>
                        <option value="">Select</option>
                        <option> yes</option>
                        <option>no</option>
                    </select>
                </div>
                <label style={{ marginLeft: 100 }}>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                <label style={{ marginLeft: -100 }}>
                    Season:
                    <input
                        type="text"
                        value={seasonBanner}
                        onChange={(e) => setSeasonBanner(e.target.value)}
                    />
                </label>
                <label style={{ marginLeft: 100 }}>
                    Package:
                    <input
                        type="text"
                        value={Package}
                        onChange={(e) => setPackage(e.target.value)}
                    />
                </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >

                <label style={{ marginLeft: -100 }} >
                    Package Priority:
                </label>
                <select id="PPrority" name="PPriority" value={packagePriority} onChange={(e) => setpackagePriority(parseInt(e.target.value))}>
                    <option value="">Select Package</option>
                    {Priority.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
                <label style={{ marginLeft: 100 }}>
                    Phone:
                    <input
                        type="text"
                        // value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                    />
                </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <label style={{ marginLeft: -70 }}>
                    Home Delivery:
                    <input
                        type="checkbox"
                        checked={homeDelivery}
                        onChange={(e) => setHomeDelivery(e.target.checked)}
                    />
                </label>
                <label style={{ marginLeft: 70 }}>
                    Featured:
                    <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                    />
                </label>
                <label style={{ marginLeft: 70 }}>
                    Online Shop:
                    <input
                        type="checkbox"
                        checked={onlineShop}
                        onChange={(e) => setOnlineShop(e.target.checked)}
                    />
                </label>
                <label style={{ marginLeft: 70 }}>
                    Exclusive:
                    <input
                        type="checkbox"
                        checked={exclusive}
                        onChange={(e) => setExclusive(e.target.checked)}
                    />
                </label>
            </div>
            <h2>Offer</h2>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <label style={{ marginLeft: -100 }}>
                    <input
                        type="file"
                        placeholder="Image URL"
                        onChange={handleOfferImageChange}

                    />
                </label>
                {/* //  */}
                <label style={{ marginLeft: 100 }}>
                    Offers Discount:
                    <input
                        type="text"
                        value={offer[0].offersdiscount}
                        onChange={(e) =>
                            setOffers([{ ...offer[0], offersdiscount: e.target.value }])
                        }
                    />
                </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

            </div>
            <button onClick={handleSubmit} type="submit">Submit</button>
            <ToastContainer />
        </form>
    );
}

export default MyForm;
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StatusBar, KeyboardAvoidingView, TextInput, ScrollView, PermissionsAndroid, Platform, ImageBackground, ActivityIndicator } from 'react-native';
import Axios from 'axios';
import BASE_URL from '../Config';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ProductDetails = ({ navigation, route }) => {

    const [productDetails, setProductDetails] = React.useState({});
	const [addressDetails, setAddressDetails] = React.useState({});
	const [userDetails, setUserDetails] = React.useState({});
	const [userAddress, setUserAddress] = React.useState({});
 
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const { otherParam } = route.params;
		console.log(otherParam)
        Details(otherParam[0]._id)
		UserDetails(otherParam[0].userId)
    }, [navigation]);

	const UserDetails = (adId) => {
		console.log('---')
        Axios.get(`${BASE_URL}/user/userDetailsById/${adId}`)
            .then((res) => {
				setUserAddress(res.data.address)
                setUserDetails(res.data)
                setLoading(false)
            }).catch((error) => {
                console.log(error)
            });
    }

    const Details = (adId) => {
		
        Axios.get(`${BASE_URL}/user/rentedProductDetail/${adId}`)
            .then((res) => {
                setProductDetails(res.data)
				setAddressDetails(res.data.address)
            }).catch((error) => {
                console.log(error)
            });
    }

	const handleMarkAsDelivered = () => {
		console.log(productDetails._id)
		console.log(productDetails.image)
        Axios.post(`${BASE_URL}/user/markasPicked/${productDetails._id}`)
            .then((res) => {
				console.log(res.data)
				navigation.navigate("MyOrders")
            }).catch((error) => {
                console.log(error)
            });
    }

    return (
        <>
            {
                loading === true ?
                    (
                        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color="#8B0000" />
                        </View>
                    ) :
                    (
                        <View style={{ flex: 1, backgroundColor: 'white' }}>
                            <View style={{ flex: 0.3, backgroundColor: '#F5F5F5' }}>
                                {
                                    productDetails.image ?
                                        (
                                            <Image
                                                source={{ uri: productDetails.image }} resizeMode='stretch' style={{ flex: 1 }}
                                            />
                                        ) : null
                                }
                            </View>
                            <View style={{ flex: 0.6, margin:5 }}>
                                <ScrollView>
                                    <View style={{ height: hp('27%'),}}>
										<View style={{ flex:0.2,backgroundColor: '#8B0000', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
											<Text style={{ fontWeight:'bold', color:'white', fontSize:15,   }}>Pick Up Detials</Text>
										</View>
										<View style={{ flex:0.2, justifyContent:'space-between', flexDirection:'row'}}>
											<View style={{ flex:0.5, justifyContent:'center'}}>
												<Text style={{ fontWeight:'bold', color:'black', fontSize:12, textAlign:'center'  }}>Name</Text>
											</View>
											<View style={{ flex:0.5, justifyContent:'center'}}>
												<Text style={{ fontWeight:'600', color:'black', fontSize:12, textAlign:'center'  }}>{userDetails.name}</Text>
											</View>
										</View>
										<View style={{ flex:0.2, justifyContent:'space-between', flexDirection:'row'}}>
											<View style={{ flex:0.5, justifyContent:'center'}}>
												<Text style={{ fontWeight:'bold', color:'black', fontSize:12, textAlign:'center'  }}>Mobile Number</Text>
											</View>
											<View style={{ flex:0.5, justifyContent:'center'}}>
												<Text style={{ fontWeight:'600', color:'black', fontSize:12, textAlign:'center'  }}>{userDetails.mobileNumber}</Text>
											</View>
										</View>
										<View style={{ flex:0.2, justifyContent:'space-between', flexDirection:'row'}}>
											<View style={{ flex:0.5, justifyContent:'center'}}>
												<Text style={{ fontWeight:'bold', color:'black', fontSize:12, textAlign:'center'  }}>Email</Text>
											</View>
											<View style={{ flex:0.5, justifyContent:'center'}}>
												<Text style={{ fontWeight:'600', color:'black', fontSize:12, textAlign:'center'  }}>{userDetails.email}</Text>
											</View>
										</View>
										<View style={{ flex:0.2, justifyContent:'space-between', flexDirection:'row'}}>
											<View style={{ flex:0.5, justifyContent:'center'}}>
												<Text style={{ fontWeight:'bold', color:'black', fontSize:12, textAlign:'center'  }}>Address</Text>
											</View>
											<View style={{ flex:0.5, justifyContent:'center'}}>
												<Text style={{ fontWeight:'600', color:'black', fontSize:12, textAlign:'center'  }}>{userAddress.houseNo} {userAddress.streetNo} {userAddress.nearBy}</Text>
											</View>
										</View>
									</View>

									<View style={{ height: hp('27%'),}}>
									<View style={{ flex:0.2,backgroundColor: '#8B0000', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
											<Text style={{ fontWeight:'bold', color:'white', fontSize:15  }}>Delivery Detials</Text>
										</View>
										<View style={{ flex:0.2, justifyContent:'space-between', flexDirection:'row'}}>
											<View style={{ flex:0.5, justifyContent:'center'}}>
												<Text style={{ fontWeight:'bold', color:'black', fontSize:12, textAlign:'center'  }}>Title</Text>
											</View>
											<View style={{ flex:0.5, justifyContent:'center'}}>
												<Text style={{ fontWeight:'600', color:'black', fontSize:12, textAlign:'center'  }}>{productDetails.title}</Text>
											</View>
										</View>
										<View style={{ flex:0.2, justifyContent:'space-between', flexDirection:'row'}}>
											<View style={{ flex:0.5, justifyContent:'center'}}>
												<Text style={{ fontWeight:'bold', color:'black', fontSize:12, textAlign:'center'  }}>Name</Text>
											</View>
											<View style={{ flex:0.5, justifyContent:'center'}}>
												<Text style={{ fontWeight:'600', color:'black', fontSize:12, textAlign:'center'  }}>{productDetails.name}</Text>
											</View>
										</View>
										<View style={{ flex:0.2, justifyContent:'space-between', flexDirection:'row'}}>
											<View style={{ flex:0.5, justifyContent:'center'}}>
												<Text style={{ fontWeight:'bold', color:'black', fontSize:12, textAlign:'center'  }}>Mobile Number</Text>
											</View>
											<View style={{ flex:0.5, justifyContent:'center'}}>
												<Text style={{ fontWeight:'600', color:'black', fontSize:12, textAlign:'center'  }}>{productDetails.mobileNumber}</Text>
											</View>
										</View>
										<View style={{ flex:0.2, justifyContent:'space-between', flexDirection:'row'}}>
											<View style={{ flex:0.5, justifyContent:'center'}}>
												<Text style={{ fontWeight:'bold', color:'black', fontSize:12, textAlign:'center'  }}>Address</Text>
											</View>
											<View style={{ flex:0.5, justifyContent:'center'}}>
												<Text style={{ fontWeight:'600', color:'black', fontSize:12, textAlign:'center'  }}>{addressDetails.houseNo} {addressDetails.streetNo} {addressDetails.nearBy}</Text>
											</View>
										</View>
									</View>
                                </ScrollView>
                            </View>
                            <View style={{ flex: 0.1, justifyContent: 'center' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity style={{ width: '60%', backgroundColor: '#8B0000', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 7 }} onPress={()=> {handleMarkAsDelivered()}}>
                                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>
                                            Mark As Delivered
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
            }
        </>

    );
}

export default ProductDetails;
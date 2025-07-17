import {Gender} from '@/enum/router-name'


export interface UserName{
        title: string,
        first: string,
        last: string
   }


export interface UserLocation{
    street:{
        number: number,
        name: string
    },
    city: string,
    state: string,
    country: string,
    postcode: number,
    coordinates:{
        latitude: number,
        longitude: number
    }
    timezone:{
        offset:string,
        decription: string
    }
}


export interface UserlogIn{
        uuid: string,
        username: string,
        password: string,
        salt: string,
        md5: string,
        sha1: string,
        sha256: string
}

export interface UserDob{
    date: string,
    age: number
}

export interface UserRegistered{
    date: string,
    age: number
}

export interface UserId{
    name: string,
    value:string
}

export interface UserPicture{
    large:string,
    medium: string,
    thumbmail: string
}

export interface User{
    userGender: Gender,
    userName:UserName;
    userlocation:UserLocation,
    userEmail: string,
    userLogin:UserlogIn,
    userDob:UserDob,
    userRegistered:UserRegistered,
    userPhone: string
    userCell: string,
    uerId: UserId,
    userPicture: UserPicture,
    userNat: string
}

export interface UserInfo{
    results: User[],
    info:{

     seed: string,
     results: number,
      page: number,
      version: number
    }

}

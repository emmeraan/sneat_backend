import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { DatabaseService } from "../database/Database.service";

@Injectable()
export class UserService{
    constructor(private readonly DB:DatabaseService){}

    async userProfile(userService,res){
        console.log(userService)
        let user = await this.DB.Models['User'].findOne({
            attributes:['full_name','username','email','bio'],
            where:[{id:userService.id}]
        })
        res.status(200).json({
            status:true,
            user:user
        })
    }
    async EditProfile(editProfile,authUser,res){
        console.log(editProfile);
        
        let user = await this.DB.Models['User'].findOne({
           where:[{id:authUser.id}]
        })
        console.log(authUser)
        let update = await this.DB.Models['User'].update({
         full_name: editProfile.full_name ? editProfile.full_name : user.full_name, image: editProfile.image ? editProfile.image : user.image,username: editProfile.username ? editProfile.username : user.username, phone: editProfile.phone ? editProfile.phone : user.phone, bio: editProfile.bio ? editProfile.bio : user.bio},
         {
          where:[{id:authUser.id}]
         }
        )  
    if(update){
        res.status(200).json({
            status:true,
            message:`user information updated successfully`
        })
    }
    }
}

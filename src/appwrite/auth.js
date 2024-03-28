import config from "../config/config";
import {Client , Account , ID} from "appwrite"

export class AuthService{
	client = new Client();
	account;

	constructor()
	{
		this.client
			.setEndpoint(config.appwriteUrl)
			.setProject(config.appwriteProjectID);

		this.account = new Account(this.client);
	}

	async createAccount({email,password, name})
	{
		try{
			const userAccount = await this.account.create(ID.unique(),email,password,name);

			if(userAccount)
			{
				//call another method.
				return userAccount;
			}
			else{
				return userAccount;
			}
		}
		catch(error)
		{
			throw error;
		}
	}

	async login({email,password})
	{
		try{

			await this.account.createEmailSession(email,password);

		}
		catch(error)
		{
			throw error;
		}
	}

	async getCurrentUser()
	{
		try {
			return await this.account.get();

		} catch (error) {
			console.log("Appwrite service :: getCurrentUser :: error : ", error);
		}

		return null;
	}
}

const authService = new AuthService();

export default authService;

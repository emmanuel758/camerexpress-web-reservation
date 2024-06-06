import { Profil } from "./Profil.interface"
import { Site } from "./site.interface"
import { Ville } from "./ville.interface"

export class Client {
    id!: number
    username!: string
    password!:string
    nom!: string
    ville!: Ville
    quartier!: string
    telephone!: string
    email!: string
}

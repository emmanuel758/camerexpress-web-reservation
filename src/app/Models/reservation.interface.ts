import { Client } from "./client.interface"
import { Site } from "./site.interface"
import { Voyage } from "./voyage.interface"

export class Reservation {
    id!: number
    voyage!: Voyage
    client!: Client | null
    prix!: number
    nom!: string
    code!: string
    classe!: string
    dateReservation!: Date
    placesAdulte!: number
    placesEnfant!: number
    passagers!: string
    bagages!: string
    scanned!: boolean
    isAlertSms!: boolean
    statut!: string
}

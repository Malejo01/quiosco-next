import {z} from 'zod' 

export const OrderSchema = z.object({
    name: z.string().
        min(1, 'Debes colocar tu nombre')
})
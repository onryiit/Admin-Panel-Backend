// routes/customerRoutes.js (veya benzer bir dosya adı)

import express from 'express';

import mongoose from 'mongoose'; 
import Customer from '../Models/Customer';
import moment from 'moment';


const customerRoutes = express.Router();

customerRoutes.post('/', async (req:any, res:any) => {
    const pk = "Customers"
    const id = new Date().getTime();

    const customer_id = id
    try {
        const { name, status ,role} = req.body;

        if (name === undefined || status === undefined) {
            return res.status(400).json({ message: 'İsim (name) ve durum (status) alanları zorunludur.' });
        }
        const createdAt = new Date().getTime().toString()

        const newCustomer = new Customer({
            pk:pk,
            id:customer_id,
            name,
            status,
            role,
            createdAt
        });
        const savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
    } catch (error) {
        console.error("Müşteri oluşturma hatası:", error);
        if (error.code === 11000) {
             return res.status(409).json({ message: `Bu isimde ('${error.keyValue.name}') bir müşteri zaten mevcut.` });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Geçersiz veri.", details: error.errors });
        }
        res.status(500).json({ message: 'Müşteri oluşturulurken sunucu hatası oluştu.' });
    }
});

customerRoutes.get('/', async (req, res) => {
    try {
        const pk= "Customers"
        const customers = await Customer.find({pk:pk}); 
        res.status(200).json(customers);
    } catch (error) {
        console.error("Müşteriler getirilirken hata:", error);
        res.status(500).json({ message: 'Müşteriler getirilirken sunucu hatası oluştu.' });
    }
});

customerRoutes.get('/:id', async (req:any, res:any) => {
    try {
        const pk = "Customers"
        const customerId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ message: 'Geçersiz Müşteri ID formatı.' });
        }

        const customer = await Customer.findOne({pk:pk,id:customerId});

        if (!customer) {
            return res.status(404).json({ message: 'Müşteri bulunamadı.' });
        }

        res.status(200).json(customer);

    } catch (error) {
        console.error("Müşteri getirilirken hata:", error);
        res.status(500).json({ message: 'Müşteri getirilirken sunucu hatası oluştu.' });
    }
});

customerRoutes.put('/', async (req:any, res:any) => {
    const { name, status,role } = req.body;
    const  id = req.query.id;
    const pk = `Customers` 
    const createdAt = String(moment().unix() * 1000) 
    let updatePayload: { name?: string, status?: string, role?: string ,createdAt?:string}={
            name,
            status,
            role,
            createdAt
    }
    try {
        const updatedNote = await Customer.findOneAndUpdate(
            { pk: pk, id: id },   
            { $set: updatePayload },    
            {
                new: true,            // Güncellenmiş dokümanı döndür
                runValidators: true   // Şema validasyonlarını çalıştır
            }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.json(updatedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the Customer' });
    }
});
// --- DELETE: Belirli bir müşteriyi ID ile silme ---
customerRoutes.delete('/', async (req:any, res:any) => {
    const  id = req.query.id;
    const pk = `Customers` 

    try {
        const deletedNote = await Customer.findOneAndDelete({ pk:pk, id: parseInt(id) });

        if (!deletedNote) {
            return res.status(404).json({ message: 'Not bulunamadı' });
        }

        res.json({ message: 'Customer silindi', note: deletedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Bir hata oluştu' });
    }
});


export default customerRoutes; // Router'ı export et
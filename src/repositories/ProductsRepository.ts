import { db } from '../firebase/config';

import { v4 as uuid } from 'uuid';

interface IProduct {
  id?: string;
  name?: string;
  price?: string | number;
  img?: {
    url: string;
    title: string;
  };
}

class ProductsRepository {
  async findAll() {
    const docs = await db.collection('products').get();
    const products: IProduct[] = [];
    docs.forEach(doc => products.push(doc.data()));

    return products;
  }

  async findById(id: string) {
    const doc = await db.collection('products').doc(id).get();
    return doc.data();
  }

  async create({ name, price, img }: IProduct) {
    const id = uuid();
    const docs = await db.collection('products').doc(id).set({
      id,
      name,
      price,
      img,
    });

    return docs;
  }

  async update({ id, name, price, img }: IProduct) {
    const docRef = db.collection('products').doc(id!);

    const res = await docRef.update({
      id,
      name,
      price,
      img,
    });

    return res;
  }

  async findByName(name: string) {
    const docs = await db
      .collection('products')
      .where('name', '==', name)
      .get();

    const product: IProduct[] = [];

    docs.forEach(doc => product.push(doc.data()));

    return product;
  }

  async delete(id: string) {
    const deleteOp = db.collection('products').doc(id).delete();

    return deleteOp;
  }
}

export default new ProductsRepository();

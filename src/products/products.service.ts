import { Injectable ,NotFoundException} from "@nestjs/common";
import { Product } from "./product.model";
@Injectable()
export class ProductsService{
    products:Product[]=[];  //empty array

    insertProduct(title:string,desc:string,price:number){
        const prodId=Math.random().toString();
        const newProduct=new Product(prodId,title,desc,price)
        this.products.push(newProduct);
        return prodId;
    }

    getProducts(){
        return [...this.products];
    }

    private findProduct(id:string):[Product,number]{
        const productIndex=this.products.findIndex((prod)=>prod.id===id)
        const product=this.products[productIndex];
        if(!product)
        {
            throw new NotFoundException('Could Not find this product')
        }
        return [product,productIndex];
    }

    getSingleProduct(productId:string){
        const product=this.findProduct(productId)[0];
        return {...product};
    }

    updateProduct(productId:string,title:string,desc:string,price:number)
    {
        const [product,index]=this.findProduct(productId);
        const updatedProduct={...product};
        if(title){  //if it's already there
            updatedProduct.title=title;
        }
        if(desc){  //if it's already there
            updatedProduct.desc =desc;
        }
        if(price){  //if it's already there
            updatedProduct.price=price;
        }
        this.products[index]=updatedProduct;
    }
    
    deleteProduct(prodId:string){
       const index =this.findProduct(prodId)[1];
       this.products.splice(index,1);
    }
}
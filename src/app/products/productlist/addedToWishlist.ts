import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";

@Directive({
    selector:'[addedToWishlist]'
})
export class AddedToWishlist{

    constructor(private el:ElementRef,private renderer:Renderer2){}

    @Input() set addedToWishlist(value:boolean){
        if(value){
            this.renderer.setStyle(this.el.nativeElement,'color','red');
        }
        else{
            this.renderer.setStyle(this.el.nativeElement,'color','grey');   
        }
    }
}
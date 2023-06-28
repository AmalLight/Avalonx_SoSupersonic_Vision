class label
{
    static clearValue( query : string ) : void
    {
        ( <HTMLLabelElement>document.querySelector( `label[ id=${query} ]` ) ).innerHTML = '' ;
    }

    static setValue( query : string , value : string ) : void
    {
        ( <HTMLLabelElement>document.querySelector( `label[ id=${query} ]` ) ).innerHTML = value ;
    }

    static getValue( query : string ) : string
    {
        const txtlabel : HTMLLabelElement | null = ( <HTMLLabelElement>document.querySelector( `label[ id=${query} ]` ) ) ;
        
        if ( txtlabel && txtlabel.innerHTML ) return txtlabel.innerHTML ;

        return '' ;
    }

    static updateLineValue( query : string , value : string ) : void
    {
        var reader : string = label.getValue( query ) ;

        label.setValue( query , `${reader}${reader.length ? '<br>' : '' }${value}` ) ;

        label.setYscrollTopValue( query , label.getYscrollTopSize( query ) ) ;
    }

    static getXscrollLeftSize( query : string ) : number
    {
        const txtlabel : HTMLLabelElement | null = ( <HTMLLabelElement>document.querySelector( `label[ id=${query} ]` ) ) ;

        if ( txtlabel ) return txtlabel.scrollWidth ;
        
        return 0 ;
    }

    static getYscrollTopSize( query : string ) : number
    {
        const txtlabel : HTMLLabelElement | null = ( <HTMLLabelElement>document.querySelector( `label[ id=${query} ]` ) ) ;

        if ( txtlabel ) return txtlabel.scrollHeight ;

        return 0 ;
    }

    static setXscrollLeftValue( query : string , value : number ) : void
    {
        ( <HTMLLabelElement>document.querySelector( `label[ id=${query} ]` ) ).scrollLeft = value ;
    }

    static setYscrollTopValue( query : string , value : number ) : void
    {
        ( <HTMLLabelElement>document.querySelector( `label[ id=${query} ]` ) ).scrollTop = value ;
    }
}

class input
{
    static clearValue( query : string ) : void
    {
        ( <HTMLInputElement>document.querySelector( `input[ id=${query} ]` ) ).value = '' ;
    }

    static setValue( query : string , value : string ) : void
    {
        ( <HTMLInputElement>document.querySelector( `input[ id=${query} ]` ) ).value = value ;
    }

    static getValue( query : string ) : string
    {
        const txtinput : HTMLInputElement | null = ( <HTMLInputElement>document.querySelector( `input[ id=${query} ]` ) ) ;

        if ( txtinput && txtinput.value ) return txtinput.value ;

        return '' ;
    }

    static setStyle( query : string , style : string ) : void
    {
        document.querySelector( `input[ id=${query} ]` )?.setAttribute( 'style' , style ) ;
    }
}

class textarea
{
    static clearValue( query : string ) : void
    {
        ( <HTMLTextAreaElement>document.querySelector( `textarea[ id=${query} ]` ) ).value = '' ;
    }

    static setValue( query : string , value : string ) : void
    {
        ( <HTMLTextAreaElement>document.querySelector( `textarea[ id=${query} ]` ) ).value = value ;
    }

    static getValue( query : string ) : string
    {
        const txtarea : HTMLTextAreaElement | null = ( <HTMLTextAreaElement>document.querySelector( `textarea[ id=${query} ]` ) ) ;

        if ( txtarea && txtarea.value ) return txtarea.value ;

        return '' ;
    }

    static updateLineValue( query : string , value : string ) : void
    {
        const reader : string = textarea.getValue( query ) ;

        textarea.setValue( query , `${reader}${reader.length ? '\n' : '' }${value}` ) ;

        textarea.setYscrollTopValue(  query , textarea.getYscrollTopSize( query ) ) ;
    }

    static getYscrollTopSize( query : string ) : number
    {
        const txtarea : HTMLTextAreaElement | null = ( <HTMLTextAreaElement>document.querySelector( `textarea[ id=${query} ]` ) ) ;

        if ( txtarea ) return txtarea.scrollHeight ;

        return 0 ;
    }

    static setYscrollTopValue( query : string , value : number ) : void
    {
        ( <HTMLTextAreaElement>document.querySelector( `textarea[ id=${query} ]` ) ).scrollTop = value ;
    }

    static setStyle( query : string , key : any , value : string ) : void
    {
        ( <HTMLTextAreaElement>document.querySelector( `textarea[ id=${query} ]` ) ).style[ key ] = value ;
    }
}

class forId
{
    static styleBlock( id : string ) : void
    {
        document.getElementById( id )?.setAttribute( 'style' , 'display:block' ) ;
    }

    static styleNone( id : string ) : void
    {
        document.getElementById( id )?.setAttribute( 'style' , 'display:none' ) ;
    }
}
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
        const txtlabel :  HTMLLabelElement   | null = <HTMLLabelElement>document.querySelector( `label[ id=${query} ]` ) ;

        if ( txtlabel && txtlabel.innerHTML ) return txtlabel.innerHTML ;
            
        return '' ;
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
        const txtinput :  HTMLInputElement | null = <HTMLInputElement>document.querySelector( `input[ id=${query} ]` ) ;
        
        if ( txtinput && txtinput.value ) return txtinput.value ;

        return '' ;
    }

    static setStyle( query : string , style : string ) : void
    {
        ( <HTMLInputElement>document.querySelector( `input[ id=${query} ]` ) ).setAttribute( 'style' , style ) ;
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
        const txtarea :  HTMLTextAreaElement | null = document.querySelector( `textarea[ id=${query} ]` ) ;

        if ( txtarea && txtarea.value ) return txtarea.value ;

        return '' ;
    }

    static updateFinalLineValue( query : string , value : string ) : void
    {
        const reader : string = textarea.getValue( query ) ;

        textarea.setValue( query , `${reader}${reader.length ? '\n' : '' }${value}`        ) ;
        textarea.setCaret( query , `${reader}${reader.length ? '\n' : '' }${value}`.length ) ;
    }

    static updateFinalRowValue( query : string , value : string ) : void
    {
        textarea.setValue( query , textarea.getValue( query ) + value ) ;
        textarea.setCaret( query , textarea.getValue( query ).length  ) ;
    }

    static updateCurrentRowValue( query : string , value : string ) : number /* return current_caret */
    {
        const txtarea_value   : string = textarea.getValue( query ) ;
        const txtarea_old_car : number = textarea.getCaret( query ) ;
        const txtarea_new_car : number = txtarea_old_car + value.length ;

        const txtarea_substring_before : string = txtarea_value.substring( 0 , textarea.getCaret( query ) ) ;
        const txtarea_substring_after  : string = txtarea_value.substring(     textarea.getCaret( query ) ) ;

        textarea.setValue( query , txtarea_substring_before + value + txtarea_substring_after ) ;
        
        textarea.setCaret( query , txtarea_new_car ) ;
        return                     txtarea_new_car   ;
    }

    static getYscrollTopValue( query : string ) : number
    {
        const txtarea : HTMLTextAreaElement | null = document.querySelector( `textarea[ id=${query} ]` ) ;

        if ( txtarea ) return txtarea.scrollTop ;

        return 0 ;
    }

    static getYscrollTopSize( query : string ) : number
    {
        const txtarea : HTMLTextAreaElement | null = document.querySelector( `textarea[ id=${query} ]` ) ;

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

    static setColClass( query : string , value_to_reset : string[] , value_to_set : string ) : void
    {
        for ( var i = 0 ; i  < value_to_reset.length ; i++ ) // to remove

        ( <HTMLTextAreaElement>document.querySelector( `textarea[ id=${query} ]` ) ).classList.remove( 'col-' + value_to_reset[ i ] ) ;
        ( <HTMLTextAreaElement>document.querySelector( `textarea[ id=${query} ]` ) ).classList.add(    'col-' + value_to_set ) ;
    }

    static getCaret( query : string , start : boolean = true ) : number
    {
        const  txtarea : HTMLTextAreaElement | null = ( <HTMLTextAreaElement>document.querySelector( `textarea[ id=${query} ]` ) ) ;
        
        if ( txtarea &&   start ) return txtarea.selectionStart ;
        if ( txtarea && ! start ) return txtarea.selectionEnd   ;

        return 0 ;
    }

    static getSelection( query : string ) : string
    {
        const txtarea : HTMLTextAreaElement | null = ( <HTMLTextAreaElement>document.querySelector( `textarea[ id=${query} ]` ) ) ;

        if ( txtarea && txtarea.value ) return txtarea.value.substring( txtarea.selectionStart , txtarea.selectionEnd ) ;
        
        else return '' ;
    }

    static setCaret( query : string , i : number ) : void
    {
        ( <HTMLTextAreaElement>document.querySelector( `textarea[ id=${query} ]` ) ).selectionStart = i ;
        ( <HTMLTextAreaElement>document.querySelector( `textarea[ id=${query} ]` ) ).selectionEnd   = i ;
    }

    static setCareti( query : string , i : number ) : void
    {
        ( <HTMLTextAreaElement>document.querySelector( `textarea[ id=${query} ]` ) ).selectionStart = i   ;
        ( <HTMLTextAreaElement>document.querySelector( `textarea[ id=${query} ]` ) ).selectionEnd   = i+1 ;
    }

    static setCaretxy( query : string , x : number , y : number ) : void
    {
        ( <HTMLTextAreaElement>document.querySelector( `textarea[ id=${query} ]` ) ).selectionStart = x ;
        ( <HTMLTextAreaElement>document.querySelector( `textarea[ id=${query} ]` ) ).selectionEnd   = y ;
    }

    static delPosCurrentRow( query : string , amount : number ) : void
    {
        const old_text : string = textarea.getValue( query         ) ;
        const old_car  : number = textarea.getCaret( query , false ) ;

        textarea.setValue( query , old_text.substring( 0 , old_car - amount ) + old_text.substring( old_car ) ) ;
        textarea.setCaret( query ,                         old_car - amount ) ;
    }

    static insertNewSelection( query : string , newinsert : string ) : void
    {
        const select : string = textarea.getSelection( query ) ;
        const carx   : number = textarea.getCaret(     query ) ;
        const cary   : number = textarea.getCaret(     query , false ) ;

        textarea.setCaret( query , cary ) ;

        textarea.delPosCurrentRow(      query , select.length ) ;
        textarea.updateCurrentRowValue( query ,     newinsert ) ;

        textarea.setCaretxy( query , carx , carx + newinsert.length ) ;
    }

    static focusOn( query : string ) : void
    {
        ( <HTMLTextAreaElement>document.querySelector( `textarea[ id=${query} ]` ) ).focus() ;
    }
}

class div
{
    static setStyle( query : string , key : any , value : string ) : void
    {
        ( <HTMLDivElement> document.querySelector( `div[ id=${query} ]` ) ).style[ key ] = value ;
    }

    static clearValue( query : string ) : void
    {
        ( <HTMLDivElement>document.querySelector( `div[ id=${query} ]` ) ).innerHTML = '' ;
    }

    static setValue( query : string , value : string ) : void
    {
        ( <HTMLDivElement>document.querySelector( `div[ id=${query} ]` ) ).innerHTML = value ;
    }

    static setColClass( query : string , value_to_reset : string[] , value_to_set : string ) : void
    {
        for ( var i = 0 ; i  < value_to_reset.length ; i++ ) // to remove
            
        ( <HTMLDivElement>document.querySelector( `div[ id=${query} ]` ) ).classList.remove( 'col-' + value_to_reset[ i ] ) ;
        ( <HTMLDivElement>document.querySelector( `div[ id=${query} ]` ) ).classList.add(    'col-' +   value_to_set      ) ;
    }

    static getValue( query : string ) : string
    {
        const txtdiv :  HTMLDivElement   | null = ( <HTMLDivElement> document.querySelector( `div[ id=${query} ]` ) ) ;

        if ( txtdiv && txtdiv.innerHTML ) return txtdiv.innerHTML ;

        return '' ;
    }

    static getYscrollTopValue( query : string ) : number
    {
        const txtdiv : HTMLDivElement | null = ( <HTMLDivElement> document.querySelector( `div[ id=${query} ]` ) ) ;
        
        if ( txtdiv ) return txtdiv.scrollTop ;
        
        return 0 ;
    }

    static setYscrollTopValue( query : string , value : number ) : void
    {
        ( <HTMLDivElement>document.querySelector( `div[ id=${query} ]` ) ).scrollTop = value ;
    }

    static getYscrollTopSize( query : string ) : number
    {
        const txtdiv : HTMLDivElement | null = ( <HTMLDivElement> document.querySelector( `div[ id=${query} ]` ) ) ;
        
        if ( txtdiv ) return txtdiv.scrollHeight ;
        
        return 0 ;
    }

    static updateFinalLineValue( query : string , value : string ) : void
    {
        var reader : string = div.getValue( query ) ;

        div.setValue( query , `${reader}${reader.length ? '<br>' : '' }${value}` ) ;

        div.setYscrollTopValue( query , div.getYscrollTopSize( query ) ) ;
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
$( document ).ready( function ()  {
    $('#solicitud').change(function(){
        $('.motivo').hide();
        $('#' + $(this).val()).show().attr("name", "motivo");
    });
});

$.validator.setDefaults( {

        submitHandler: function () {
            alert( "submitted!" );
      location.reload();
    
     $.ajax({
  type: "POST",
  url: "scripts/process.php",
  data: dataString,
  success: function() {
   $("#exito").html("<p> Your article was successfully added!</p>");
 
  }
 });
return false;
     

        }
    } );


    $( document ).ready( function () {
        $( "#contact" ).validate( {
    
            rules: {
      
                firstname: "required",
                lastname: "required",
                email: {
                    required: true,
                    email: true
                },

                movil:  {
                    required:true,
                    number:true,
                    minlength:8,
                    _maxlength: 9,
                    get maxlength() {
                        return this._maxlength;
                    },
                    set maxlength(value) {
                        this._maxlength = value;
                    },
                },

                usuario: {
                    required:true,
                    number: true,
                    minlength:3,
                    maxlength:8
                },
               
               cp: {
                required: true,
                number:true,
                minlength: 5,
                maxlength: 5
                },
      
      
                agree: "required"
            },
            messages: {
                firstname: "Por favor, introduce tu nombre",
                lastname: "Por favor, introduce tu apellido",
                
      
            email: {
                required: "Introduce tu correo.",
                 email: "introduce un correo válido"
      },
            cp: {
                 required: "Introduce tu código postal",
                 number: "Introduce un código postal válido.",
                 maxlength: "Debe contener al menos 5 dígitos.",
                 minlength: "Debe contener 5 dígitos."
    },
      
                agree: "Debes aceptar las condiciones"
            },
            errorElement: "em",
            errorPlacement: function ( error, element ) {
                
                error.addClass( "help-block" );

                if ( element.prop( "type" ) === "checkbox" ) {
                    error.insertAfter( element.parent( "label" ) );
                } else {
                    error.insertAfter( element );
                }
            },
            highlight: function ( element, errorClass, validClass ) {
                $( element ).parents( ".validar" ).addClass( "has-error" ).removeClass( "has-success" );
            },
            unhighlight: function (element, errorClass, validClass) {
                $( element ).parents( ".validar" ).addClass( "has-success" ).removeClass( "has-error" );
            }
        } );

        
    } );



function validar_dni_nif_nie(value){

              const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
              const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
              const nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
              const str = value.toString().toUpperCase();

              if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

              const nie = str
                  .replace(/^[X]/, '0')
                  .replace(/^[Y]/, '1')
                  .replace(/^[Z]/, '2');

              const letter = str.substr(-1);
              const charIndex = parseInt(nie.substr(0, 8)) % 23;

              if (validChars.charAt(charIndex) === letter) return true;

              return false;
        }
$.validator.addMethod("docIdent", function(value, element) {
return validar_dni_nif_nie(value);
}, 'Introduce un documento de identidad valido.');
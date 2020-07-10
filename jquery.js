
$(document).ready(function(){
    let Sections = [];   //YETENEKLERİ ÜZERİNDE TUTACAK OLAN DİZİ
    let Educations = [];   //EĞİTİM BİLGİLERİNİ ÜZERİNDE TUTACAK DİZİ
    let SectionID = 1;
    let EducationID = 1;
    
    let check = true;
    if(sessionStorage.getItem("SectionCheck"))
        check = sessionStorage.getItem("SectionCheck");


    var resim = document.getElementById("ProfilePicture");

    $('#SavePictureButton').click(function(){

        // Gönder düğmesine basılıyor
        var gonder = document.getElementById("SavePictureButton");
        if (gonder) {
        gonder.addEventListener("click", function () {
            var dosya = document.getElementById("pictureadres").files[0];
            base64eCevir(dosya);
            $('#PictureModal').modal('toggle');
        });
        }
        })
  

        jQuery('#SaveAboutButton').click(function(){
    
            TextControl();
              
        })

        $('#SaveEducationButton').click(function(){

            EducationTextControl();
        })

        $('#SaveSectionButton').click(function(){

            SectionTextControl();
        })

        $('#SaveGeneralButton').click(function(){  
            GeneralTextControl();
        })

        $('#PencilButtonSection').on('click',function(){  //SECTİON CLEAR
            SectionClear();
            
        })

        $('#PencilButtonEducation').on('click',function(){

            EducationClear();
        })

    
        //YETENEK DELETE

        $('#SectionDiv').on('click', '.delete-section', function () {

            let SelectedID = $(this).attr("id");   //SEÇİLİ BUTONUN İD DEĞERİNE ULAŞ
            let FilterSections = Sections.filter(x=>x.SectionID != SelectedID);
            sessionStorage.setItem("Sections",JSON.stringify(FilterSections));
            location.reload(true);  //SAYFAYI YENİLE
            //SAYFA YENİLENDİĞİNDE PRİNTSECTİONS FONKSİYONU ZATEN OTOMATİK ÇALIŞIYOR.
       

        });

        //YETENEK UPDATE
        $('#SectionDiv').on('click', '.update-section',function(){
            $('#ModalSectionUpdate').modal(); 
            let SelectedID = $(this).attr('id');
            let FilterSections = Sections.find(x=>x.SectionID == SelectedID);
            $('#SectionUpdateText').val(FilterSections.Yetenek);


            $('#SectionUpdateButton').click(function(){  //YETENEK BİLGİSİ GİRİLDİĞİNDE
                let NewSection = $('#SectionUpdateText').val();
                if(NewSection == null || NewSection == ""){
                    alert("Lütfen İlgili Alanı Doldurunuz.")
                }

                else
                { 
                    FilterSections.Yetenek = NewSection;
                    sessionStorage.setItem("Sections",JSON.stringify(Sections));
                    
                    Swal.fire({ 
                        icon: 'success',
                        title: 'Bilgiler Güncellendi.',
                        showConfirmButton: false,
                        timer: 800 
                      })

                    setTimeout(() =>{
                        $('#ModalSectionUpdate').modal("hide");
                        location.reload(true);    //SAYFAYI YENİLE 

                    },1000);
                }
            })
        })


        //EĞİTİM DELETE

            $('#EducationDiv').on('click', '.delete-education',function(){
            let SelectedID = $(this).attr('id');  //BUTONUN İDSİNİ AL. 
            
            let FilterEducations = Educations.filter(x=>x.EducationID != SelectedID);
            sessionStorage.setItem("Educations",JSON.stringify(FilterEducations));  //STORAGE'A AT

            location.reload(true);   //SAYFAYI YENİLE

            })

        //EĞİTİM UPDATE
        $('#EducationDiv').on('click','.update-education',function(){

            let SelectedID = $(this).attr('id');
            let FilterEducation = Educations.find(x=>x.EducationID == SelectedID);  //İDSİ GELEN KAYITI BUL

            $('#UpdateSchoolText').val(FilterEducation.SchoolName);
            $('#UpdateDepartmentText').val(FilterEducation.Department);   //DEĞERLERİ TEXTBOXLARA YAZ
            $('#UpdateFirstYear').val(FilterEducation.FirstYear);
            $('#UpdateLastYear').val(FilterEducation.LastYear);
            
            
             $('#UpdateEducation').modal();   //MODALI AÇ.



             $('#UpdateEducationButton').on('click',function(){

             let UpdateEducationArray = [$('#UpdateSchoolText').val(),$('#UpdateDepartmentText').val(),
             $('#UpdateFirstYear').val(), $('#UpdateLastYear').val()];
             let UpdateEducationCheck = true;
             $.each(UpdateEducationArray,function(key,value){

                if(value == null || value == "")
                    UpdateEducationCheck = false;
             })
             if(UpdateEducationCheck == false)
                alert("Lütfen İlgili alanları Doldurunuz.")
            else{
                FilterEducation.SchoolName = $('#UpdateSchoolText').val();
                FilterEducation.Department = $('#UpdateDepartmentText').val();
                FilterEducation.FirstYear = $('#UpdateFirstYear').val();
                FilterEducation.LastYear = $('#UpdateLastYear').val();
                sessionStorage.setItem("Educations",JSON.stringify(Educations));   //KAYDET
                Swal.fire({ 
                    icon: 'success',
                    title: 'Bilgiler Güncellendi.',
                    showConfirmButton: false,
                    timer: 800 
                  })
                setTimeout(()=>{
                    $('#UpdateEducation').modal("hide");
                    location.reload(true);  //SAYFAYI YENİLE
                },900);
            }

             })

            
        })

       
     




        //STORAGE METHOTLARI
         PictureStorage();  //ÇALIŞIYOR
         VisiterCounter();  //ÇALIŞIYOR
         AboutStorage();    //ÇALIŞIYOR
         GeneralStorage();  //ÇALIŞIYOR


         PrintSections(); 
         PrintEducations();

        
         
         
        //HAKKINDA METHOTU
        let TextControl = ()=>{
            let AboutText = $('#AboutTextArea').val(); 
            if(AboutText == null || AboutText == ""){
                Swal.fire({
                    icon: 'error',
                    title: 'Hata!',
                    text: 'Lütfen İlgili Alanı Doldurun.',  
                  })
            }
            else{     
                sessionStorage.setItem("About",$('#AboutTextArea').val());


                $('#AboutText').text(AboutText); 
                Swal.fire({ 
                    icon: 'success',
                    title: 'Bilgiler Güncellendi.',
                    showConfirmButton: false,
                    timer: 800 
                  })
                  $('#ModalAbout').modal('toggle');
                  $('#AboutTextArea').val("");
            }
        }


        //EĞİTİM METHOTU

        let EducationTextControl = ()=>{
            let inputCheck = true;
            
            let Values = [$('#SchoolText').val(),$('#DepartmentText').val(),
                $('#FirstYear').val(),$('#LastYear').val()]

                $.each(Values,function(key,value){  //TÜM DEĞERLERİ GEZ BOŞ VARSA FALSE DÖNDER
                    
                    if(value == null || value == "")
                        inputCheck = false;                        
                })

                if(inputCheck){

                    //ÖNCE STORAGE'A AT
                    var School = {EducationID : EducationID, SchoolName : Values[0], Department : Values[1], 
                        FirstYear : Values[2], LastYear : Values[3]};
                    Educations.push(School);
                    sessionStorage.setItem("Educations",JSON.stringify(Educations));
                    EducationID++;
                    sessionStorage.setItem("EducationID",EducationID);

                    //SONRA EKRANA YAZ
                    $('#EducationText').append("<li class='list-group-item ml-2 py-3 mb-2'><b>" 
                        +School.SchoolName+ "</b><br>" +School.Department+"" 
                        +"<button id=" +School.EducationID +" class= 'float-right mb-4 btn btn-info btn-sm update-education'"+
                        "style='margin-bottom: 50px;'>Güncelle</button>" 
                        +"<button id=" +School.EducationID +" class= 'mr-1 float-right mb-4 btn btn-danger btn-sm delete-education'"+
                        "style='margin-bottom: 50px;'>Sil</button><br>" 
                        +School.FirstYear + " - " +School.LastYear +"<br>")

                    Swal.fire({ 
                        icon: 'success',
                        title: 'Bilgiler Güncellendi.',
                        showConfirmButton: false,
                        timer: 800 
                      })
                    $('#ModalEducation').modal('toggle');

                    }
                else{
                    alert('Lütfen Boş Alanları Doldurunuz.')}
        }


        //YETENEK METHOTU

        let SectionTextControl = ()=>{
            let Yetenek = $('#SectionText').val();

            if(Yetenek == null || Yetenek == ""){
                alert('Lütfen Boş Alanları Doldurunuz.')}

            else if(check){
                var section = {SectionID : SectionID, Yetenek : $('#SectionText').val()};
                Sections.push(section);  //DİZİYE PUSHLA
                sessionStorage.setItem("Sections",JSON.stringify(Sections));  //STORAGE'A AT
                SectionID++;
                sessionStorage.setItem("SectionID",SectionID);  //IDYİ 1 ARTTIR STORAGE'A AT

                check = false;
                sessionStorage.setItem("SectionCheck",check);
                $('#SectionDiv').append("<span class='margin Paragraf' style='font-size: 16px;'>" + Yetenek +"</span>")
                //YETENEK
                $('#SectionDiv').append("<button id=" +section.SectionID +" class= 'mb-4 float-right btn btn-info btn-sm update-section'"+
                "style='margin-bottom: 50px; margin-right: 20px;'>Güncelle</button>")
                //GÜNCELLE
                $('#SectionDiv').append("<button id=" +section.SectionID +" class= 'mb-4 mr-1 float-right  btn btn-danger btn-sm delete-section'"+ 
                "style='margin-bottom: 50px;'>Sil</button>")
                //SİL
                 Swal.fire({ 
                    icon: 'success',
                    title: 'Bilgiler Güncellendi.',
                    showConfirmButton: false,
                    timer: 800 
                  })
                  $('#ModalSection').modal('toggle');
                }
            
                
                else{
                    var section = {SectionID : SectionID, Yetenek : $('#SectionText').val()};
                Sections.push(section);  //DİZİYE PUSHLA
                sessionStorage.setItem("Sections",JSON.stringify(Sections));  //STORAGE'A AT
                SectionID++;
                sessionStorage.setItem("SectionID",SectionID);  //IDYİ 1 ARTTIR STORAGE'A AT


                $('#SectionDiv').append("<hr color = '#dbdbdb' align='left' width = '795' class='ml-2'>")
                //ÇİZGİ
                $('#SectionDiv').append("<span class='margin Paragraf' style='font-size: 16px;'>" + Yetenek +"</span>")
                //YETENEK
                $('#SectionDiv').append("<button id=" +section.SectionID +" class= 'mb-4 float-right btn btn-info btn-sm update-section'"+
                "style='margin-bottom: 50px; margin-right: 20px'>Güncelle</button>")
                //GÜNCELLE
                $('#SectionDiv').append("<button id=" +section.SectionID +" class= 'mb-4 mr-1 float-right  btn btn-danger btn-sm delete-section'"+ 
                "style='margin-bottom: 50px;'>Sil</button>")
                //SİL


                Swal.fire({ 
                    icon: 'success',
                    title: 'Bilgiler Güncellendi.',
                    showConfirmButton: false,
                    timer: 800 
                  })
                  $('#ModalSection').modal('toggle');
                }

                  
                  
                
            }

            let GeneralTextControl = ()=>{
                inputCheck2 = true;
                    
                let GeneralValues = [($('#ModalName').val(),$('#ModalLastname').val(),$('#ModalSchool').val(),
                $('#ModalCity').val(),$('#ModalCountry').val(),$('#ModalNumber').val(),$('#ModalMail').val())]

                $.each(GeneralValues,function(key,value){  //TÜM DEĞERLERİ GEZ BOŞ VARSA FALSE DÖNDER
                    
                    if(value == null || value == "")
                        inputCheck2 = false;                        
                })
                 if(inputCheck2){
                    //ÖNCE GELEN VERİLERİ SESSİON STORAGE'A AT

                     let GeneralInfo = [$('#ModalName').val(),$('#ModalLastname').val(), $('#ModalSchool').val(),
                     $('#ModalCity').val(), $('#ModalCountry').val(), $('#ModalNumber').val(), $('#ModalMail').val()]
                     sessionStorage.setItem("General",JSON.stringify(GeneralInfo));


                    //SONRA İLGİLİ ALANLARA YAZDIR
                    $('#GeneralName').text($('#ModalName').val() + " " +$('#ModalLastname').val());
                    $('#GeneralSchool').text($('#ModalSchool').val());
                    $('#GeneralAdress').text($('#ModalCity').val()+ " , " +$('#ModalCountry').val());
                    $('#GeneralNumber').text($('#ModalNumber').val());
                    $('#GeneralMail').text($('#ModalMail').val());

                    Swal.fire({ 
                        icon: 'success',
                        title: 'Bilgiler Güncellendi.',
                        showConfirmButton: false,
                        timer: 800 
                      })

                      $('#ModalGeneral').modal('toggle'); 
                      GeneralClear();       
                 }

                 else
                    alert('Lütfen İlgili Alanları Doldurun.')
            }
        

                // Dosyayı base 64'e çeviren metod
                
            function base64eCevir(dosya) {
                var dosyaokuyucu = new FileReader();
                dosyaokuyucu.readAsDataURL(dosya);
                dosyaokuyucu.onload = function () {
                // Resmi göster
                    let picturesrc = dosyaokuyucu.result;
                    sessionStorage.setItem("Picture",picturesrc);  //STORAGE'A AT
                    resim.src = picturesrc;
                    Swal.fire({ 
                        icon: 'success',
                        title: 'Resim Başarıyla Güncellendi.',
                        showConfirmButton: false,
                        timer: 800 
                      })
                };
                dosyaokuyucu.onerror = function (error) {
                 // Hata oluştu
                    alert("Hata: " + error);
                };
                }

            function VisiterCounter(){
                    let value = localStorage.getItem("VisiterCount");  //DEĞERİ ÇEK
                    value++;          //1 ARTTIR
                    localStorage.setItem("VisiterCount",value);   //GERİ STORAGE'A AT
                    $('#Visit').text(localStorage.getItem("VisiterCount"));
                    }
                

            function AboutStorage(){
                
                    $('#AboutText').text(sessionStorage.getItem("About"));

                }

            function GeneralStorage(){

                       let getGeneralInfo = JSON.parse(sessionStorage.getItem("General"));
                       

                        if(getGeneralInfo){
                            $('#GeneralName').text(getGeneralInfo[0] + " " +getGeneralInfo[1]);
                            $('#GeneralSchool').text(getGeneralInfo[2]);
                            $('#GeneralAdress').text(getGeneralInfo[3] +"," +getGeneralInfo[4]);
                            $('#GeneralNumber').text(getGeneralInfo[5]);
                            $('#GeneralMail').text(getGeneralInfo[6]);
                        }
                        else
                            console.log('Hiçbirşey Yapma.')
                      
                            
                  }

              


            function PictureStorage(){

                     var picture = sessionStorage.getItem("Picture");
                     if(picture == null)
                     {
                        picture = "images/noimage.jpg"
                        resim.src = picture;
                     }

                    else
                     resim.src = picture;  
                  }                  

            function PrintSections(){

                    if(sessionStorage.getItem("Sections") != null)
                        Sections = JSON.parse(sessionStorage.getItem("Sections"))
                

                    $.each(Sections,function(key,section){   
            
                        if(check){
                            check = false;
                            sessionStorage.setItem("SectionCheck",check);  //CHECKİ STORAGE'A AT

                            $('#SectionDiv').append("<span class='margin Paragraf' style='font-size: 16px;'>" + section.Yetenek +"</span>")

                            $('#SectionDiv').append("<button id=" +section.SectionID +" class= 'mb-4 float-right btn btn-info btn-sm update-section'"+
                            "style='margin-bottom: 50px; margin-right: 20px'>Güncelle</button>")
                            //GÜNCELLE
                            $('#SectionDiv').append("<button id=" +section.SectionID +" class= 'mb-4 mr-1 float-right  btn btn-danger btn-sm delete-section'"+ 
                            "style='margin-bottom: 50px;'>Sil</button>")
                            //SİL
                             
                            
                            SectionID++;
                        }

                        else{
                            $('#SectionDiv').append("<hr color = '#dbdbdb' align='left' width = '795' class='ml-2'>")
                            $('#SectionDiv').append("<span class='margin Paragraf' style='font-size: 16px;'>" + section.Yetenek +"</span>")
                            $('#SectionDiv').append("<button id=" +section.SectionID +" class= 'mb-4 float-right btn btn-info btn-sm update-section'"+
                            "style='margin-bottom: 50px; margin-right: 20px'>Güncelle</button>")
                            //GÜNCELLE
                            $('#SectionDiv').append("<button id=" +section.SectionID +" class= 'mb-4 mr-1 float-right  btn btn-danger btn-sm delete-section'"+ 
                            "style='margin-bottom: 50px;'>Sil</button>")
                            //SİL

                            
                            SectionID++;     
                        }
                    })


                }

            function SectionClear(){

                    $('#SectionText').val("");  //TEXBOXU SIFIRLA
                   
                }

            function PrintEducations(){

                    if(sessionStorage.getItem("Educations") != null){
                        Educations = JSON.parse(sessionStorage.getItem("Educations"));
                    }

                    $.each(Educations,function(key,education){

                        $('#EducationText').append("<li class='list-group-item ml-2 py-3 mb-2'><b>" 
                        +education.SchoolName+ "</b><br>" +education.Department+"" 
                        +"<button id=" +education.EducationID +" class= 'float-right mb-4 btn btn-info btn-sm update-education'"+
                        "style='margin-bottom: 50px;'>Güncelle</button>" 
                        +"<button id=" +education.EducationID +" class= 'mr-1 float-right mb-4 btn btn-danger btn-sm delete-education'"+
                        "style='margin-bottom: 50px;'>Sil</button><br>" 
                        +education.FirstYear + " - " +education.LastYear +"<br>")
                        
                        EducationID++;


                    })
                }


            function EducationClear(){

                $('#SchoolText').val("");
                $('#DepartmentText').val("");
                $('#FirstYear').val("");
                $('#LastYear').val("");

                }
                

            function GeneralClear(){

                $('#PencilButton').on('click',function(){

                    $('#ModalName').val("");
                    $('#ModalLastname').val("");
                    $('#ModalSchool').val("");
                    $('#ModalCity').val("");
                    $('#ModalCountry').val("");
                    $('#ModalNumber').val("");
                    $('#ModalMail').val("");
                })
            }
                 
            
                
                
                  }

                


               
               

                  
                    
                
                  
                


                         
    )



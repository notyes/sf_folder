function isBlank(field)
        {
                if ((field.value=='') || (field.value == ' ') || (field.value =='0'))
                {
                        return true
                }
                else
                {
                        return false
                }
        }
	
	function CountLength(field)
			{
				if (field.value.length < 4)
				{
					return false;
				}
					return true;
			}


        function checkmailchr(field)
        {
                var chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-@.'
                var temp

                for (var i=0;i<field.value.length;i++)
                {
                        temp=field.value.substring(i,i+1)
                        if (chars.indexOf(temp,0)==-1)
                        {
                                field.select()
                                return false
                        }
                }
        }

 function checknumeric(field)
        {
                var chars='0123456789- '
                var temp

                for (var i=0;i<field.value.length;i++)
                {
                        temp=field.value.substring(i,i+1)
                        if (chars.indexOf(temp,0)==-1)
                        {
                                field.select()
                                return false
                        }
                }
				return true
        }


	function checknum(field)
{
	if (field.value.length<9)
		 {
		 return false
		}
	else
		{
		return true
		}
}

        function isValidEmail(field)
        {
                if ((field.value.indexOf('@') != -1 ) && (field.value.indexOf('.') != -1))
                {
                        var symchars1 = '@'
                        var symchars2 = '.'
                        var tempcount1 = 0
                        var tempcount2 = 0

                        for (var i=0;i<field.value.length;i++)
                        {
                                if (symchars1 == field.value.substring(i,i+1))
                                {
                                        tempcount1 = i;
                                }
                                if (symchars2 == field.value.substring(i,i+1))
                                {
                                        tempcount2 = i;
                                }
                        }

                        if (tempcount1 > tempcount2)
                        {
                                field.select()
                                return false;
                        }
                }
                else
                {
                        field.select()
                        return false;
                }
                if (checkmailchr(field) == false)
                {
                        field.select()
                        return false;
                }
                return true;
        }


        function validatechar()
        {
                var arr=new Array()
				var mform = document.frm;
				arr[0]=mform.fname;
				arr[1]=mform.lname;
				arr[2]=mform.tel;
				arr[3]=mform.email;

				var entrybox=new Array()

                entrybox[0] = 'ชื่อ';
                entrybox[1] = 'นามสกุล';
                entrybox[2] = 'เบอร์โทรศัพท์';
                entrybox[3] = 'อีเมล์';
  
                   x=0
                while (x<=arr.length-1)
                {


						if (x==2)
						{
						if (checknum(arr[x])==false)
							{
							  alert("กรุณาตรวจสอบเบอร์โทรศัพท์ให้ถูกต้อง")
								   arr[x].focus()
								return false
							}

							      if (checknumeric(arr[x])==false)
                                {
                                        alert('"' + entrybox[x] + '\" ต้องเป็นตัวเลขเท่านั้น')
                                        arr[x].focus()
                                        return false
                                }

							  
						}

                        if (x == 3)
                        {
                                if (isBlank(arr[x])==true)
                                {
                                        alert('กรุณากรอกข้อมูลของ \"' + entrybox[x] + '\".')
                                        arr[x].focus()
                                        return false
                                }

                                if (isValidEmail(arr[x])==false)
                                {
                                        alert('กรุณากรอกข้อมูลของ \"' + entrybox[x] + '\" ให้ถูกต้อง')
                                        arr[x].focus()
                                        return false
                                }
                        }

					

						
						else
                        {
                                if (isBlank(arr[x])==true)
                                {
                                        alert('กรุณากรอกข้อมูลของ \"' + entrybox[x] + '\".')
                                        arr[x].focus()
                                        return false
                                }
                        }


                        x++;
                }
                return true
        }

function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}
function callSave()
{
	if (validatechar())
		{
			return true
		}
		else{return false}

}
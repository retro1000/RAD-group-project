function validation(values){
    let error = [false, {}]
    const firstname_pattern =/^[A-Za-z]+$/
    const lastname_pattern =/^[A-Za-z]+$/
    const email_pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    const contactno_pattern = /^0[0-9]{9}$/
    const username_pattern = /^[A-Za-z0-9_-]{5,}$/
    const password_pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{8,}$/
    const age_pattern = /^\d+$/

    if(values.email === ''){
        error[1].email = "Email should not be empty"
        error[0]=true
    }

    else if(!email_pattern.test(values.email)){
        error[1].email = "Email didn't Match"
        error[0]=true
    }
    else{
        error[1].email = null
        error[0]=false
    }

    if(values.first_name === ''){
        error[1].first_name = "firstname should not be empty"
        error[0]=true
    }

    else if(!firstname_pattern.test(values.first_name)){
        error[1].first_name = "Firstname didn't Match"
        error[0]=true
    }
    else{
        error[1].first_name = null
        error[0]=false
    }

    if(values.last_name === ''){
        error[1].last_name = "Lastname should not be empty"
        error[0]=true
    }

    else if(!lastname_pattern.test(values.last_name)){
        error[1].last_name = "Lastname didn't Match"
        error[0]=true
    }
    else{
        error[1].last_name = null
        error[0]=false
    }

    if(values.age === ''){
        error[1].age = "Age should not be empty"
        error[0]=true
    }

    else if(!age_pattern.test(values.age)){
        error[1].age = "Age didn't Match"
        error[0]=true
    }
    else{
        error[1].age = null
        error[0]=false
    }

    if(values.contact_no === ''){
        error[1].contact_no = "ContactNo should not be empty"
        error[0]=true
    }else if(!contactno_pattern.test(values.contact_no)){
        error[1].contact_no = "ContactNo didn't Match"
        error[0]=true
    }else{
        error[1].contact_no = null
        error[0]=false
    }

    if(values.username === ''){
        error[1].username = "Username should not be empty"
        error[0]=true
    }

    else if(!username_pattern.test(values.username)){
        error[1].username = "Username didn't Match"
        error[0]=true
    }
    else{
        error[1].username = null
        error[0]=false
    }
    if(values.password === ''){
        error[1].password = "Password should not be empty"
        error[0]=true
    }

    else if(!password_pattern.test(values.password)){
        error[1].password = "Password didn't Match"
        error[0]=true
    }
    else{
        error[1].password = null
        error[0]=false
    }
   
    return error; 
  
}

export default validation;
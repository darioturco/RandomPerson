import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-elements';
import Button from './Button';

export default function Person() {

  const [imgLink, setImgLink] = useState(undefined);
  const [name, setName] = useState("Name: ");
  const [gender, setGender] = useState("Gender: ");
  const [mail, setMail] = useState("Mail: ");
  const [birthday, setBirthday] = useState("Birthday: ");
  const [country, setCountry] = useState("Country: ");
  const [city, setCity] = useState("City: ");
  const [phone, setPhone] = useState("Phone: ");
  const [username, setUsername] = useState("Username: ");
  const [password, setPassword] = useState("Password: ");
  var updating = false;

  async function getData(){
    if(!updating){
      // console.log("Pide...");
      updating = true;
      let data = await fetch('https://randomuser.me/api/');
      data = await data.json();
      // console.log(data);
      // console.log("Listo");
      setData(data.results[0]);
      updating = false;
    }
  }

  function setData(data){
    setImgLink(data.picture.large);
    setName("Name: " + data.name.first + data.name.last);
    setGender("Gender: " + data.gender.charAt(0).toUpperCase() + data.gender.slice(1));
    setMail("Mail: " + data.email.slice(0, data.email.indexOf('@')+1) + randomMail());
    setBirthday("Birthday: " + data.dob.date.slice(0, 10).replaceAll('-', '/'));
    setCountry("Country: " + data.location.country);
    setCity("City: " + data.location.city);
    setPhone("Phone: " + data.cell);
    setUsername("Username: " + data.login.username);
    setPassword("Password: " + data.login.password);
  }

  function randomMail(){
    return ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com", "msn.com", "aol.com"][Math.floor(Math.random(6))]
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: imgLink }} style={styles.img} />
      <View style={styles.container}>
        <Text>{name}</Text>
        <Text>{gender}</Text>
        <Text>{mail}</Text>
        <Text>{birthday}</Text>
        <Text>{country}</Text>
        <Text>{city}</Text>
        <Text>{phone}</Text>
        <Text>{username}</Text>
        <Text>{password}</Text>
      </View>
      <Button title="Change" style={styles.button} onPress={getData}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    marginTop: 100,
    width: 150,
    height: 150
  },
  button: {
    marginBottom: 120,
    width: 80,
    height: 32,
    backgroundColor: '#ff8268',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  }
});

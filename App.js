import React, { useState } from 'react';
import { render } from 'react-dom';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-web';
import { SearchBar } from 'react-native-elements';

const Calculator = () => {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    left:{
      flex: 5,
    },
    right:{
      flex: 5,
    },
    input_output:{
      flex: 2,
      padding: 10,
    },

    buttons:{
      flexGrow: 5,
      flexDirection: 'row',
    },
    numbers:{
      flex: 3,
      backgroundColor: 'yellow',
    },
    operations:{
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'stretch',
      backgroundColor: 'black',
    },
    row:{
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    btn1:{
      flex: 2,
      alignItems: 'center',
      alignSelf: 'stretch',
      justifyContent: 'center',
      backgroundColor: "pink",
      borderWidth: 1,
    },
    btn2:{
      flex: 2,
      alignItems: 'center',
      alignSelf: 'stretch',
      justifyContent: 'center',
      backgroundColor: "beige",
      borderWidth: 1,
      //borderRadius: 10,
    },
    btnText:{
      color: 'brown',
      fontSize: 35,
    },
    white:{
      color: 'cornflowerblue',
    },
    item:{
      marginTop: 15,
      padding: 20,
      backgroundColor: 'pink',
      fontSize: 24,
    },
  });

  let rows = []
  let numbs = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']]
  let operations = ['DEL', '+', '-', '*', '/']
  for(let i=0; i<4; i++){
    let row = []
    for(let j=0; j<3; j++){
      row.push(
        <TouchableOpacity onPress={() => handleButton(numbs[i][j])} style={styles.btn1}>
          <Text style={styles.btnText}>{numbs[i][j]}</Text>
        </TouchableOpacity>
      )
    }
    rows.push(
      <View style={styles.row}>{row}</View>
    )
  }

  let ops = []
  for(let i=0; i<5; i++){
    ops.push(
      <TouchableOpacity onPress={() => handleButton(operations[i])} style={styles.btn2}>
        <Text style={[styles.btnText, styles.white]}>{operations[i]}</Text>
      </TouchableOpacity>
    )
  }

  const fetchData = () => {
    setIsFetching(false);
  };
  const onRefresh = () => {
    setIsFetching(true);
    fetchData();
  };

  function handleButton(txt) {
    switch(txt){
      case 'DEL':
        var x = text.split('');
        x.pop();
        setText(x.join(''));
        try{
          var a = eval(x.join(''));
          setResult(a);
        }
        catch(e){
          setResult("");
        }
        break

      case '=':
        try{
          var a = eval(text);
          setResult(a);
          var h = history;
          h.push({
            id: h.length,
            expression: text,
            result: result,
          });
          setHistory(h);
          setSearch(h);
          this.onRefresh;
        }
        catch(e){
          setResult("");
        }
        
        break;
        
      default:
        const t = text + txt;
        setText(t);
        try{
          var a = eval(t);
          setResult(a);
        }
        catch(e){
          setResult("");
        }
    }


  }


  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');
  const [x, setX] = useState('');

  const [isFetching, setIsFetching] = useState(false);

  
  return (
    <View style={styles.container}>

      <View style={styles.left}>
        <View style={styles.input_output}>

          <TextInput
            style={{height: 40, fontSize: 30, fontFamily: "monospace"}}
            placeholder="Type here to calculate!"
            onChangeText={newText => {
              setText(newText);
              try{
                var a = eval(newText);
                setResult(a);
              }
              catch(e){
                setResult("");
              }
            }}
            value={text}
          />

          <Text style={{padding: 10, fontSize: 50, fontFamily: "monospace"}}>
            {result}
          </Text>
        </View>

        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>

          <View style={styles.operations}>
            {ops}
          </View>
        </View>

      </View>

      <View style={styles.right}>
        
        <View style={styles.searchBar}>
          <SearchBar
            placeholder="Type Here To Search"
            onChangeText={newText =>{
              setX(newText);
              var a = history.filter((value, index, arr) => {
                return value.expression.toString().includes(newText) || value.result.toString().includes(newText);
              });
              console.log(a);
              setSearch(a);
            }}
            value={x}
          />
        </View>

        <FlatList
          data={search}
          renderItem={({item}) => (
            <Text style={styles.item}>{item.expression + " ="}  {item.result}</Text>
          )}
          keyExtractor={(item) => item.id}
          extraData={search}
          onRefresh={onRefresh}
          refreshing={isFetching}
        />
      </View>

    </View>

  );
}


export default Calculator;
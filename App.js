import React, { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';

const Page = styled.View `
  flex: 1;
  align-items: center;
`;

const  HeaderText = styled.Text `
  font-size:25px;
  font-weight: bold;
  margin-top: 20px;
`;

const Input = styled.TextInput `
width: 90%;
height: 50px;
font-size: 18px;
font-weight: bold;
background-color: #EEE;
margin-top: 20px;
border-radius: 10px;
padding: 10px;
`;

const CalcButton = styled.TouchableOpacity `
  margin-top:10px;
  background-color: #eee;
  color: #000;
  height: 50px;
  width: 150px;
  border-radius: 10px;
`;

const ResultArea = styled.View `
  width: 100%;
  margin-top: 30px;
  background-color: #EEE;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const ResultItemTitle = styled.Text `
  font-size: 18px;
  font-weight: bold;
`;

const ResultItem = styled.Text `
  font-size: 15px;
  margin-bottom: 30px;
`;

const TextButton = styled.Text `
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const PctArea = styled.View `
flex-direction: row;
justify-content: space-between;
margin: 20px;
`;

const PctItem = styled.TouchableOpacity `
  margin-top:10px;
  color: #000;
  height: 50px;
  width: 50px;
`;

export default () => {

  const [bill, setBill] = useState('');
  const [tip, setTip] = useState(0);
  const [pct, setPct] = useState(10);

  const calc = () => {
    let nBill = parseFloat(bill);

    if(nBill) {
      setTip((pct/100) * nBill);
    }
  }

  useEffect(()=>{
    calc();
  }, [pct]);

  return(
    <Page>
      <HeaderText>Calculadora de Gorjeta</HeaderText>
      <Input placeholder="Quanto foi a conta?" 
      placeholderTextColor="#000" 
      keyboardType="numeric"
      value = {bill}
      onChangeText = {n=>setBill(n)}
      />

      <PctArea>
        <PctItem onPress={()=>setPct(5, Keyboard.dismiss())}>
          <TextButton>5%</TextButton>
        </PctItem>
        <PctItem onPress={()=>setPct(10, Keyboard.dismiss())}>
          <TextButton>10%</TextButton>
        </PctItem>
        <PctItem onPress={()=>setPct(15, Keyboard.dismiss())}>
          <TextButton>15%</TextButton>
        </PctItem>
        <PctItem onPress={()=>setPct(20, Keyboard.dismiss())}>
          <TextButton>20%</TextButton>
        </PctItem>
      </PctArea>

      <CalcButton onPress={calc}>
        <TextButton>Calcular</TextButton>
      </CalcButton>
      {tip > 0 &&
        <ResultArea>
          <ResultItemTitle>Valor da Conta</ResultItemTitle>
          <ResultItem>R$ {parseInt(bill).toFixed(2)}</ResultItem>

          <ResultItemTitle>Valor da Gorjeta</ResultItemTitle>
          <ResultItem>R$ {tip.toFixed(2)} ({pct}%)</ResultItem>

          <ResultItemTitle>Valor Total</ResultItemTitle>
          <ResultItem>R$ {(parseFloat(bill) + tip).toFixed(2)}</ResultItem> 

        </ResultArea>
      }
    </Page>   
  );
}
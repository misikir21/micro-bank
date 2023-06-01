'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(val,key,ma)
{
  console.log(`${val} ${key}`)
});

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
for(const [i,mov] of movements.entries()){
  if(mov >0){
    console.log(`movemet ${i+1}:you depoisted ${mov}`)
  }
  else {
    console.log(`movemet ${i+1}:you withdrew ${Math.abs(mov)}`)
  }
}

movements.forEach(function (mov,i,arr) 
{
  if(mov >0){
    console.log(`movemet ${i+1}:you depoisted ${mov}`)
  }
  else {
    console.log(`movemet ${i+1}:you withdrew ${Math.abs(mov)}`)
  }
})
/////////////////////////////////////////////////
//slice
// let arr=['a','b','c','d','e'];
// console.log(arr.slice(2))
// console.log(arr.slice(1,-3))


//////////////////////////////////////////////4
//splice
//splice will mutate the orgial array
// console.log(arr.splice(2,2))
// console.log(arr)
// console.log(arr.join('x'))


//the at method works both on array and string

// console.log(arr.at(-1))

const displayMovents=function (movements) {
  containerMovements.innerHTML='';
  movements.forEach(function (mov,i) {
    const type=mov > 0?'deposit':'withdrawal';
  
  const html=`
  <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i +1}${type}</div>
          <div class="movements__value">${mov}</div>
        </div>`
 

containerMovements.insertAdjacentHTML('afterbegin',html)
});     
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
//display the balance
const calanddisplaybalance=function (acc){
  acc.balance=acc.movements.reduce((acc,mov)=>acc +mov,0)
  labelBalance.textContent=`${acc.balance} EUR`
  }


//return the of the depoists
const max=movements.reduce((acc,mov)=> acc >mov?acc:mov,movements[0]);
console.log(max)


///////////////////////////////////////////////////////
//generate user names from owners data

const createusername=function (accs){
  accs.forEach(function(acc){
    acc.username=acc.owner
    .toLowerCase()
    .split(' ')
    .map(name=>name[0])
    .join('')
  })
}
createusername(accounts);
console.log(accounts)
let curacc;
btnLogin.addEventListener('click',function(e){
  e.preventDefault()
  curacc=accounts.find(
    acc=>acc.username===inputLoginUsername.value
  );
  console.log(curacc)
  if(curacc?.pin===Number(inputLoginPin.value)){
    labelWelcome.textContent=`welcome back,${curacc.owner.split(' ')[0]}`;
    containerApp.style.opacity=100;
    //clear the input feilds
    inputLoginUsername.value=inputLoginPin.value='';
    inputLoginPin.blur()
  }
  //dsiplay movs
  displayMovents(curacc.movements)


  //dsiplay balance
  calanddisplaybalance(curacc)


 //dispaly summary


  calcDisplaySummary(curacc)
})

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount=Number(inputTransferAmount.value);
  const receiverAcc=accounts.find(acc=>acc.username===inputTransferTo.value);
  console.log(amount,receiverAcc)
  if(amount > 0 &&
    receiverAcc&&
    curacc.balance > amount&&
    receiverAcc?.username!==curacc.username
    ){
      //do the transaction
      curacc.movements.push(-amount)
      receiverAcc.movements.push(amount)
    }
})

//THE FILETR METHOD
/*const despost=movements.filter(function(mov){
  return mov>0
})

const depositfor=[];
for(const mov of movements) if (mov >0)depositfor.push(mov)
console.log(despost)
console.log(depositfor)*/


//the reduce mehtod
// const balance=movements.reduce((acc,cur,i)=>acc +cur,0)
// console.log(balance)


//the find method doesn't return an arrya it only returns an element
const accowener=accounts.find(acc => acc.owner===('Jessica Davis'))
console.log(accowener);
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
displayMovents(account1.movements)

//display the balance
const calanddisplaybalance=function (movements){
  const balance=movements.reduce((acc,mov)=>acc +mov,0)
  labelBalance.textContent=`${balance} EUR`
  }
calanddisplaybalance(account2.movements)


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
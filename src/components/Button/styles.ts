import styled from 'styled-components';


export const ButtonContainer = styled.button`
    width: 100%;
    height: 42px;
    //background-color: #81259D;
    background-color: ${props => props.disabled ? '#ccc' : '#81259D'};
    color: #FFF;

    border: 1px solid #81259D;
    border-radius: 21px;

    &:hover {
        opacity: 0.6;
        //cursor:pointer;
        cursor: ${props => props.disabled ? 'default' : 'pointer'};
    }
    &.btn-invalid {
    background-color: #dc3545;
    cursor: default;
  }
`;
// export const Button = styled.button`
//   background-color: ${props => props.disabled ? '#ccc' : '#81259D'};
//   color: #fff;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 5px;
//   cursor: ${props => props.disabled ? 'default' : 'pointer'};

//   &.btn-invalid {
//     background-color: #dc3545;
//     cursor: default;
//   }
// `;
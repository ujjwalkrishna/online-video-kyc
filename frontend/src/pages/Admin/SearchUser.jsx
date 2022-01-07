// import React, { useState } from 'react'
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import Button from 'react-bootstrap/Button';
// import { searchUser } from "../../http/index";
// import { getUserData } from "../../http/index";
// import { addNotification } from '../../components/Notification/Notification';

// const SearchUser = () => {
//     const [myOptions, setMyOptions] = useState([]);
//     const [email, setEmail] = useState('');
//     const [isLoading, setLoading] = useState(false);

//     async function handleSubmit() {
//         setLoading(true);
//         try {
//             const { data } = await getUserData({ email })
//             console.log(data);
//             setLoading(false)
//         } catch (error) {
//             let message = error.response.data.message
//             console.log(message)
//             addNotification(message);
//             setLoading(false)
//         }
//     }

//     const getDataFromAPI = async (e) => {
//         //setEmail(e.target.value);
//         try {
//             let filter_val = e.target.value;
//             const { data } = await searchUser({ email: filter_val })
//             for (var i = 0; i < data.users.length; i++) {
//                 if (!myOptions.includes(data.users[i].email))
//                     myOptions.push(data.users[i].email);
//             }
//             setMyOptions(myOptions)
//         } catch (error) {
//             console.log(error)
//             let message = error.response.data.message;
//             console.log(message);
//             addNotification(message);
//         }
//     }

//     return (
//         <div style={{ marginLeft: '40%', marginTop: '60px' }}>
//             <h3>Greetings from GeeksforGeeks!</h3>
//             <Autocomplete
//                 style={{ width: 500 }}
//                 freeSolo
//                 autoComplete
//                 onChange={(event, value) => setEmail(value)}
//                 autoHighlight
//                 options={myOptions}
//                 renderInput={(params) => (
//                     <TextField {...params}
//                         id="email-box"
//                         onChange={getDataFromAPI}
//                         variant="outlined"
//                         label="Search Box"
//                     />
//                 )}
//             />
//             <Button disabled={isLoading} size="md" id="continueBtnPan" onClick={handleSubmit} >
//                 {isLoading ? 'Submitting...' : 'Continue'}
//             </Button>
//         </div>
//     );
// }

// export default SearchUser
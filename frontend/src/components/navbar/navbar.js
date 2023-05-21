import Nav from 'react-bootstrap/Nav';

function Navbar() {
    return ( 
        <div className='navbar'>
            <img src='../../../src/pictures/logo.png' alt = "Lifted Beta logo"></img>
            <div className='navlist'>
                <div><img src="../../../src/pictures/navbar/users.png"></img></div><button>Users</button >
                <div></div><button>Students</button >
                <div></div><button>Grades</button >
                <div></div><button>Transcripts</button >
            </div>
        </div>    
    );
}

export default Navbar;
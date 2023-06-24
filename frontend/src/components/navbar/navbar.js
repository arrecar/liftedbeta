import React from 'react'

function Navbar(props) {

    if (props.role.toLowerCase() === "administrator") {
        return(
            <div className='navbar'>
                <img src='../../../src/pictures/logo.png' alt = "Lifted Beta logo"></img>
                <div className='navlist'>
                    <div></div><button>Users</button >
                    <div></div><button>Students</button >
                    <div></div><button>Grades</button >
                    <div></div><button>Transcripts</button >
                </div>
            </div> 
        );
    }
    else if (props.role.toLowerCase() === "parent") {
        return ( 
        <div className='navbar'>
            <img src='../../../src/pictures/logo.png' alt = "Lifted Beta logo"></img>
            <div className='navlist'>
                <div></div><button>Grades</button >
                <div></div><button>Transcripts</button >
            </div>
        </div> 
        );
    }
    else if (props.role.toLowerCase() === "teacher"){
        return(
            <div className='navbar'>
                <img src='../../../src/pictures/logo.png' alt = "Lifted Beta logo"></img>
                <div className='navlist'>
                    <div></div><button>Students</button >
                    <div></div><button>Grades</button >
                    <div></div><button>Transcripts</button >
                </div>
            </div> 
        );
    }
}

export default Navbar;
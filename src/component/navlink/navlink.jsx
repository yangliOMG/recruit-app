import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router-dom' 
import {connect} from 'react-redux'



@withRouter
@connect(
    state=>state.chat
)
class NavLinkBar extends React.Component{
    static propsTypes = {              
        data: PropTypes.array.isRequired     
    }
    constructor(props){
        super(props);
        this.state = {
            title:'',
        }
    }
    render(){
        const navList = this.props.data.filter(v=>!v.hide)
        const {pathname}  = this.props.location
        return (
            <TabBar>
                {navList.map((v,idx)=>
                    <TabBar.Item 
                        badge={v.path==='/msg'?this.props.unread:0}
                        title={v.text} 
                        key={idx} 
                        selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                        icon={{uri:require(`./img/${v.icon}.png`)}}
                        selected={pathname===v.path}
                        onPress={()=>{
                            this.props.history.push(v.path)
                        }}
                    >
                    </TabBar.Item>
                )}
            </TabBar>

        )
    }
}

export default NavLinkBar;
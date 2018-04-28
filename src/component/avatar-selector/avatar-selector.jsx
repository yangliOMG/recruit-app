import React from 'react'
import {Grid,List} from 'antd-mobile'
import PropTypes from 'prop-types'


class AvatarSelector extends React.Component{
    static propsTypes = {               //react插件props校验工具
        selectAvatar: PropTypes.func.isRequired     //参数selectAvatar，是函数类型，并且必需
    }
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render(){
        const avatarList = 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'
                        .split(',').map(v=>({
                            icon:require(`../img/${v}.png`),        //require~!!!!
                            text:v
                        }));
        const gridHeader = this.state.text?(
                <div>
                    <span>已选头像</span>
                    <img src={this.state.icon} alt=""/>
                </div>)
                : <div>请选择头像</div>
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid data={avatarList} columnNum={5}
                        onClick={ele=>{
                            this.setState(ele)
                            this.props.selectAvatar(ele.text)
                        }}
                    />
                </List>
                
            </div>
        )
    }
}

export default AvatarSelector;
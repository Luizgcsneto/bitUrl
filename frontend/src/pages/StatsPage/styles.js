import styled from 'styled-components'

const StatsContainer = styled.div`
    display: block;

`
const StatsRow = styled.div`
    display: flex;
    flex-flow: row wrap;
`

const StatsBox = styled.div`
    border: solid 1px #ccc; 
`
const StatsBoxTitle = styled.div`
    font-weight: bold;
`

export {
    StatsContainer,
    StatsRow,
    StatsBox,
    StatsBoxTitle
}
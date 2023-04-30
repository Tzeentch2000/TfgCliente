import React from 'react'
import { IBook } from '../../../interfaces/Interfaces'

type Props = {
    th:string[],
    td: {[key: string]: any}[],
    properties:string[]
}

const Table = (props:Props) => {
  const { th,td,properties } = props
  return (
    <table>
      <thead>
        <tr>
          {th.map(_th => (
            <th>{_th}</th>
          ))}
        </tr>
      </thead>
      <tbody>
      {td.map(_td => (
        <tr>
          {properties.map(p => (
            <td>{_td[p]}</td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default Table

'use client'
import io, { Socket } from 'socket.io-client'
import { useEffect, useState } from "react";
import Button from "@/app/components/button/button";

let socket: Socket
export default function Home() {
    const [doorOpened, setDoorOpened] = useState(false)
    useEffect(() => {
        socketInitializer()
    }, [])

    const socketInitializer = async () => {
        await fetch('/api/socket') // Socket is initializing in the backend but never trigger the connect below...
        socket = io();

        socket.on('connect', () => {
            console.log('connected =============')
        })

        socket.on('door.opened', msg => {
            setDoorOpened(true)
        })

        socket.on('door.closed', msg => {
            setDoorOpened(false)
        })
    }

    const openDoor = async () => {
        await fetch('/api/open') // normal enpoint works
        console.log('click')
        socket.emit("door.open")
    }

  return (
    <main className="min-h-screen p-10">
        <h1>Bonjour, <strong>Alexandre</strong></h1>
        <p>La porte est actuellement fermée</p>
        <div className="flex flex-col items-center justify-start py-24">
            <Button handleClick={openDoor} text={doorOpened ? 'Ouvert' : 'Ouvrir'} active={doorOpened}></Button>
        </div>
    </main>
  )
}

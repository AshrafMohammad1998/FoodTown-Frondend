import React, { useState } from "react";
import axios from 'axios';
import navImage from "/image1.jpeg";
import configVariables from "../configurations/config";

function Login() {

  const [emailOrMobile, setEmailOrMobile] = useState("")
  const [password, setPassword] = useState("")
  const [showWelcome, setShowWelcome] = useState(false)

  const handleEmailOrMobileChange = event => setEmailOrMobile(event.target.value)
  const handlePassword = event => setPassword(event.target.value)

  const handleLogin = async (e) => {
    e.preventDefault()

    const body = {
      emailOrMobile,
      password
    }
    try {
      const response = await axios.post(`${configVariables.ipAddress}/users/login`, body)
      console.log(response, "register response")
      if(response.status === 200){
        setShowWelcome(true)
        
      }
    } catch (error) {
      console.log("Error while logging in", error)
    }

  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative flex justify-center border border-blue-500 rounded-lg p-3 min-h-96 min-w-96">
        <div className="absolute -top-16 flex flex-col space-y-2">
          <div className="flex items-center justify-center">
            <img
              src={navImage}
              alt="food-town-logo"
              className="h-32 w-32 border rounded-full"
            />
          </div>

          <form className="space-y-2" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label
                className="text-black font-sans text-xl font-bold"
                htmlFor="email"
              >
                Email/Mobile
              </label>
              <input
                onChange={handleEmailOrMobileChange}
                type="text"
                className="w-full p-2 text-black border border-slate-800 rounded-lg focus:outline-none m-y-2"
                id="email"
                placeholder="Enter your email/mobile"
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-black font-sans text-xl font-bold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={handlePassword}
                type="password"
                className="w-full p-2 text-black border border-slate-800 rounded-lg focus:outline-none m-y-2"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="pt-5">
              <button type="submit" className="p-2 text-center border w-full">Login</button>
            </div>
          </form>
        </div>
      </div>
      {showWelcome && <p>You are Welcome</p>}
    </div>
  );
}

export default Login;

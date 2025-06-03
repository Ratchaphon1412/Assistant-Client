"use client";
import Spline from '@splinetool/react-spline';

const ModelHero3D = () =>{
 return (
        <div className="w-full h-screen ">
          {/* https://prod.spline.design/075JlSCrhq6Tkr1a/scene.splinecode */}
          {/* https://prod.spline.design/x7g-xpR6nHzTu3x5/scene.splinecode */}
            <Spline scene="https://prod.spline.design/075JlSCrhq6Tkr1a/scene.splinecode" />
        </div>
    );
}


export default function Chat() {
  return (
    <div >
        <ModelHero3D />
    </div>
  );
}
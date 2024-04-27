import React from 'react';
import {Text, View} from 'react-native';

const Timer = () => {
  const [seconds, setSeconds] = React.useState(10);
  const [minutes, setMinutes] = React.useState(0);

  // reverse timer
  React.useEffect(() => {
    const interval = setInterval(() => {
    //   if (minutes === 0 && seconds === 0) return clearInterval(interval);
      setSeconds(seconds => {
        if(seconds === 0 && minutes === 0) return 0;
        if (seconds === 0) {
          setMinutes(minutes => minutes - 1);
          return 59;
        }
        return seconds - 1;
      });
    }, 1000);

    // stop timer
    if (minutes <= 0 && seconds <= 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text>
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </Text>
    </View>
  );
};

export default Timer;

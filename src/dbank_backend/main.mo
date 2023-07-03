import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Time "mo:base/Time";

actor DBank {
  stable var currentValue: Float = 300;
  currentValue := 300;

  var startTime = Time.now();

  public func topUp(amount: Float) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func withdraw(amount: Float) {
    if(amount > currentValue) {
      Debug.print("You don't have sufficient balance to withdraw this amount");
    }else {
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    }
  };

  public query func checkBalance(): async Float {
    return currentValue;
  };

  public func compoundGain() {
    var currentTime = Time.now();
    let elapsedTimeNS = currentTime - startTime;
    let elapsedTimeS = elapsedTimeNS / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(elapsedTimeS));
    startTime := currentTime;
  };

  // Debug.print(debug_show(currentValue));
  // topUp();
}

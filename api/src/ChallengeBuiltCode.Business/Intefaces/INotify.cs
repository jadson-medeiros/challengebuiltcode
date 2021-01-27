using System.Collections.Generic;
using ChallengeBuiltCode.Business.Notifications;

namespace ChallengeBuiltCode.Business.Intefaces
{
    public interface INotify
    {
        bool HasNotification();
        List<Notification> GetNotifications();
        void Handle(Notification notification);
    }
}